<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uploadDir = __DIR__ . '/../uploads';
if (!is_dir($uploadDir)) {
    @mkdir($uploadDir, 0777, true);
}

if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $fileName = $_FILES['file']['name'];
    $fileTmpPath = $_FILES['file']['tmp_name'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    $allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'mp4', 'ico'];
    if (!in_array($fileExtension, $allowedExts)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Format file tidak didukung"]);
        exit;
    }

    $safeFileName = time() . '_' . preg_replace('/[^a-zA-Z0-9_\-\.]/', '', $fileName);
    $destPath = $uploadDir . '/' . $safeFileName;

    if (move_uploaded_file($fileTmpPath, $destPath)) {
        @chmod($destPath, 0666);
        echo json_encode([
            "status" => "success",
            "url" => "/uploads/" . $safeFileName,
            "filename" => $safeFileName
        ]);
        exit;
    }
}

http_response_code(400);
echo json_encode(["status" => "error", "message" => "Upload gagal"]);
exit;
