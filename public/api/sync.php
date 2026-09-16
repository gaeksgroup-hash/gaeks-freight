<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
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
    http_response_code(410);
    echo json_encode(["status" => "error", "message" => "Legacy content mutations are disabled"]);
    exit;
}

http_response_code(405);
echo json_encode(["status" => "error", "message" => "Method not allowed"]);
exit;
