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

// Upload file multipart
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['file']['tmp_name'];
    $fileName    = $_FILES['file']['name'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    $allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'mp4', 'webm', 'ico'];
    if (!in_array($fileExtension, $allowedExts)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Extension not allowed"]);
        exit;
    }

    $newFileName = time() . '_' . preg_replace('/[^a-zA-Z0-9_\-\.]/', '', $fileName);
    $destPath = $uploadDir . '/' . $newFileName;

    if (move_uploaded_file($fileTmpPath, $destPath)) {
        echo json_encode([
            "status" => "success",
            "url" => "/uploads/" . $newFileName,
            "filename" => $newFileName
        ]);
        exit;
    }
}

http_response_code(400);
echo json_encode(["status" => "error", "message" => "Upload failed or empty file"]);
exit;
