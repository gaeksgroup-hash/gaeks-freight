<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/site_content.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile) && filesize($dataFile) > 10) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode(["status" => "empty", "message" => "Using defaults"]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $decoded = json_decode($rawInput, true);

    $authPass = isset($decoded['authPassword']) ? $decoded['authPassword'] : '';
    if ($authPass !== 'Adagagap499!') {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Unauthorized"]);
        exit;
    }

    if (!empty($decoded['payload'])) {
        $saveData = json_encode($decoded['payload'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $result = @file_put_contents($dataFile, $saveData, LOCK_EX);
        @chmod($dataFile, 0666);

        if ($result !== false) {
            echo json_encode([
                "status" => "success",
                "message" => "Data tersimpan permanen di server Hostinger",
                "timestamp" => time(),
                "bytes" => $result
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Gagal menulis file di server Hostinger"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Payload kosong"]);
    }
    exit;
}

http_response_code(405);
echo json_encode(["status" => "error", "message" => "Method not allowed"]);
exit;
