<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

$dataFile = gaeks_private_dir() . '/pi_catalog.json';
gaeks_seed_private_json($dataFile, __DIR__ . '/pi_catalog_seed.json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Cache-Control: no-store, max-age=0');
    gaeks_json(gaeks_read_json_file($dataFile, ['updatedAt' => null, 'items' => []]));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    gaeks_json(['status' => 'error', 'message' => 'Method not allowed.'], 405);
}

$configuredToken = (string) getenv('GAEKS_ERP_PI_CATALOG_TOKEN');
$header = (string) ($_SERVER['HTTP_AUTHORIZATION'] ?? '');
$erpAuthorized = $configuredToken !== '' && strncmp($header, 'Bearer ', 7) === 0
    && hash_equals($configuredToken, substr($header, 7));
if (!$erpAuthorized) {
    gaeks_require_permission('site.services', true);
}

$body = gaeks_read_json_body();
$items = $body['items'] ?? null;
if (!is_array($items) || count($items) > 1000) {
    gaeks_json(['status' => 'error', 'message' => 'Daftar PI tidak valid atau terlalu panjang.'], 422);
}

$clean = [];
$seen = [];
foreach ($items as $item) {
    if (!is_array($item)) {
        gaeks_json(['status' => 'error', 'message' => 'Baris PI tidak valid.'], 422);
    }
    $hsCode = trim((string) ($item['hsCode'] ?? ''));
    $id = trim((string) ($item['id'] ?? ''));
    $status = (string) ($item['status'] ?? '');
    $commodity = trim((string) ($item['commodity'] ?? ''));
    $sourceLabel = trim((string) ($item['sourceLabel'] ?? ''));
    $sourceUrl = trim((string) ($item['sourceUrl'] ?? ''));
    $verifiedAt = trim((string) ($item['verifiedAt'] ?? ''));
    $note = trim((string) ($item['note'] ?? ''));
    if (!preg_match('/^[0-9]{4}(?:\.[0-9]{2}){1,3}$/', $hsCode)
        || !preg_match('/^[A-Za-z0-9_-]{1,80}$/', $id) || isset($seen[$id])
        || $commodity === '' || strlen($commodity) > 200
        || !in_array($status, ['ready', 'to_be_confirmed'], true)
        || strlen($sourceLabel) > 160 || strlen($note) > 500
        || ($sourceUrl !== '' && (!filter_var($sourceUrl, FILTER_VALIDATE_URL) || strpos($sourceUrl, 'https://') !== 0))
        || ($verifiedAt !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $verifiedAt))
        || ($status === 'ready' && ($verifiedAt === '' || $sourceUrl === ''))) {
        gaeks_json(['status' => 'error', 'message' => 'Periksa HS, status, sumber, dan tanggal verifikasi. Status Ready memerlukan sumber serta tanggal verifikasi.'], 422);
    }
    $seen[$id] = true;
    $clean[] = [
        'id' => $id,
        'hsCode' => $hsCode,
        'commodity' => $commodity,
        'status' => $status,
        'sourceLabel' => $sourceLabel,
        'sourceUrl' => $sourceUrl,
        'verifiedAt' => $verifiedAt !== '' ? $verifiedAt : null,
        'note' => $note,
    ];
}

$payload = ['updatedAt' => gmdate('c'), 'items' => $clean];
if (!gaeks_write_json_file($dataFile, $payload)) {
    gaeks_json(['status' => 'error', 'message' => 'Daftar PI belum dapat disimpan.'], 500);
}
gaeks_json(['status' => 'success', 'updatedAt' => $payload['updatedAt'], 'count' => count($clean)]);
