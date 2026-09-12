<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uploadDir   = __DIR__ . '/../uploads';
$libraryFile = __DIR__ . '/media_library.json';

if (!is_dir($uploadDir)) {
    @mkdir($uploadDir, 0777, true);
}

// 1. GET: Ambil daftar seluruh file di Media Server
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $list = [];
    if (file_exists($libraryFile)) {
        $list = json_decode(file_get_contents($libraryFile), true) ?: [];
    }
    echo json_encode(["status" => "success", "files" => $list]);
    exit;
}

// 2. POST: Hapus file dari Media Server
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'delete') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);
    $urlToDelete = isset($data['url']) ? $data['url'] : '';

    if (!empty($urlToDelete)) {
        $baseName = basename($urlToDelete);
        $filePath = $uploadDir . '/' . $baseName;
        if (file_exists($filePath)) {
            @unlink($filePath);
        }

        if (file_exists($libraryFile)) {
            $list = json_decode(file_get_contents($libraryFile), true) ?: [];
            $list = array_values(array_filter($list, function($item) use ($urlToDelete) {
                return $item['url'] !== $urlToDelete;
            }));
            @file_put_contents($libraryFile, json_encode($list, JSON_PRETTY_PRINT));
        }

        echo json_encode(["status" => "success", "message" => "File deleted"]);
        exit;
    }
}

// 3. POST: Upload File Baru dengan Auto-Kompresi WebP
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $fileName = $_FILES['file']['name'];
    $fileTmpPath = $_FILES['file']['tmp_name'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    $allowedImages = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'ico'];
    $allowedVideos = ['mp4', 'webm'];
    $allowedDocs   = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];
    $allAllowed    = array_merge($allowedImages, $allowedVideos, $allowedDocs);

    if (!in_array($fileExtension, $allAllowed)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Format file tidak didukung"]);
        exit;
    }

    $type = in_array($fileExtension, $allowedVideos) ? 'video' : (in_array($fileExtension, $allowedDocs) ? 'document' : 'image');
    $cleanName = preg_replace('/[^a-zA-Z0-9_\-\.]/', '', pathinfo($fileName, PATHINFO_FILENAME));
    $newFileName = time() . '_' . $cleanName . '.' . $fileExtension;
    $destPath = $uploadDir . '/' . $newFileName;

    // Auto-kompresi gambar JPG/PNG ke WebP
    if (in_array($fileExtension, ['jpg', 'jpeg', 'png']) && function_exists('imagecreatefromstring')) {
        $sourceData = file_get_contents($fileTmpPath);
        $image = @imagecreatefromstring($sourceData);
        if ($image !== false && function_exists('imagewebp')) {
            $webpFileName = time() . '_' . $cleanName . '.webp';
            $webpDestPath = $uploadDir . '/' . $webpFileName;
            if (@imagewebp($image, $webpDestPath, 85)) {
                @imagedestroy($image);
                $newFileName = $webpFileName;
                $destPath = $webpDestPath;
            } else {
                move_uploaded_file($fileTmpPath, $destPath);
                @imagedestroy($image);
            }
        } else {
            move_uploaded_file($fileTmpPath, $destPath);
        }
    } else {
        move_uploaded_file($fileTmpPath, $destPath);
    }

    @chmod($destPath, 0666);
    $publicUrl = "/uploads/" . $newFileName;
    $fileBytes = file_exists($destPath) ? filesize($destPath) : 0;
    $formattedSize = $fileBytes > 1048576 
        ? round($fileBytes / 1048576, 2) . ' MB' 
        : round($fileBytes / 1024, 1) . ' KB';

    $mediaItem = [
        "id" => "med-" . time() . '-' . rand(100, 999),
        "name" => $fileName,
        "url" => $publicUrl,
        "type" => $type,
        "size" => $formattedSize,
        "uploadedAt" => date('c')
    ];

    $list = [];
    if (file_exists($libraryFile)) {
        $list = json_decode(file_get_contents($libraryFile), true) ?: [];
    }
    array_unshift($list, $mediaItem);
    @file_put_contents($libraryFile, json_encode($list, JSON_PRETTY_PRINT));

    echo json_encode([
        "status" => "success",
        "url" => $publicUrl,
        "filename" => $newFileName,
        "mediaItem" => $mediaItem
    ]);
    exit;
}

http_response_code(400);
echo json_encode(["status" => "error", "message" => "Upload gagal"]);
exit;
