<?php
// Set CORS & Cache headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/../data/site_content.json';
$dataDir  = __DIR__ . '/../data';

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0777, true);
}

// GET: Mengambil data global untuk seluruh pengunjung website
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile) && filesize($dataFile) > 10) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode(["status" => "empty", "message" => "Using defaults"]);
    }
    exit;
}

// POST: Menyimpan pembaruan dari Operator Admin
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
        $result = @file_put_contents($dataFile, $saveData);
        if ($result !== false) {
            echo json_encode([
                "status" => "success",
                "message" => "Data saved globally to Hostinger server",
                "timestamp" => time()
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Write permission failed on server"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid payload"]);
    }
    exit;
}

http_response_code(405);
echo json_encode(["status" => "error", "message" => "Method not allowed"]);
exit;
