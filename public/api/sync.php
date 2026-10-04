<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

$dataFile = __DIR__ . '/site_content.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (is_file($dataFile) && filesize($dataFile) > 10) {
        header('Content-Type: application/json; charset=UTF-8');
        header('Cache-Control: no-store, max-age=0');
        header('X-Content-Type-Options: nosniff');
        readfile($dataFile);
        exit;
    }
    gaeks_json(['status' => 'empty', 'message' => 'Using defaults']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    gaeks_require_operator(true);
    $body = gaeks_read_json_body();
    $payload = $body['payload'] ?? null;
    if (!is_array($payload)) {
        gaeks_json(['status' => 'error', 'message' => 'Payload konten kosong.'], 400);
    }

    unset($payload['subscribers']);
    if (!isset($payload['branding'], $payload['hero'], $payload['services'], $payload['articles'])
        || !is_array($payload['services']) || !is_array($payload['articles'])) {
        gaeks_json(['status' => 'error', 'message' => 'Struktur konten tidak lengkap.'], 422);
    }

    $current = gaeks_read_json_file($dataFile, []);
    $currentIds = [];
    foreach (($current['articles'] ?? []) as $article) {
        if (is_array($article) && isset($article['id'])) {
            $currentIds[(string) $article['id']] = true;
        }
    }
    $newArticles = [];
    foreach ($payload['articles'] as $article) {
        if (is_array($article) && isset($article['id']) && !isset($currentIds[(string) $article['id']])) {
            $newArticles[] = $article;
        }
    }

    $payload['updatedAt'] = (int) round(microtime(true) * 1000);
    $encoded = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($encoded === false || @file_put_contents($dataFile, $encoded, LOCK_EX) === false) {
        gaeks_json(['status' => 'error', 'message' => 'Konten belum dapat ditulis ke server.'], 500);
    }
    @chmod($dataFile, 0644);

    $newsletter = ['articles' => count($newArticles), 'sent' => 0, 'failed' => 0];
    foreach ($newArticles as $article) {
        $delivery = gaeks_broadcast_article($article);
        $newsletter['sent'] += $delivery['sent'];
        $newsletter['failed'] += $delivery['failed'];
    }

    gaeks_json([
        'status' => 'success',
        'message' => 'Konten tersimpan di server.',
        'newsletter' => $newsletter,
    ]);
}

gaeks_json(['status' => 'error', 'message' => 'Method not allowed.'], 405);
