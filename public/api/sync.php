<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataFile = __DIR__ . '/../data/site_content.json';

// GET: Ambil data terbaru untuk pengunjung website
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode(["status" => "empty"]);
    }
    exit;
}

// POST: Simpan data dari Operator Admin
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        if (!is_dir(dirname($dataFile))) {
            mkdir(dirname($dataFile), 0755, true);
        }
        file_put_contents($dataFile, $rawInput);
        echo json_encode(["status" => "success", "timestamp" => time()]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "No data provided"]);
    }
    exit;
}
