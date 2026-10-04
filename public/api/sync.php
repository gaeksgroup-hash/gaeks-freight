<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

$bundledDataFile = __DIR__ . '/site_content.json';
$dataFile = gaeks_content_file();
gaeks_seed_private_json($dataFile, $bundledDataFile);

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
    $body = gaeks_read_json_body();
    $section = (string) ($body['section'] ?? '');
    $payload = $body['payload'] ?? null;
    if (!is_array($payload)) {
        gaeks_json(['status' => 'error', 'message' => 'Payload konten kosong.'], 400);
    }
    $current = gaeks_read_json_file($dataFile, []);
    $newArticles = [];

    $permissions = [
        'branding' => 'site.branding',
        'hero' => 'site.home',
        'siteSettings' => 'site.navigation',
        'services' => 'site.services',
        'articles' => 'content.news',
        'seo' => 'site.seo',
    ];
    if (!isset($permissions[$section])) {
        gaeks_json(['status' => 'error', 'message' => 'Modul konten tidak dikenal.'], 422);
    }
    gaeks_require_permission($permissions[$section], true);

    if (in_array($section, ['services', 'articles'], true)) {
        $sectionPayload = $payload[$section] ?? $payload;
        if (!is_array($sectionPayload)) {
            gaeks_json(['status' => 'error', 'message' => 'Daftar konten tidak valid.'], 422);
        }
    } else {
        $sectionPayload = $payload[$section] ?? $payload;
        if (!is_array($sectionPayload)) {
            gaeks_json(['status' => 'error', 'message' => 'Pengaturan tidak valid.'], 422);
        }
    }

    if ($section === 'articles') {
        $currentIds = [];
        foreach (($current['articles'] ?? []) as $article) {
            if (is_array($article) && isset($article['id'])) {
                $currentIds[(string) $article['id']] = true;
            }
        }
        foreach ($sectionPayload as $article) {
            if (is_array($article) && isset($article['id']) && !isset($currentIds[(string) $article['id']])) {
                $newArticles[] = $article;
            }
        }
    }

    $current[$section] = $sectionPayload;
    unset($current['subscribers']);
    $current['updatedAt'] = (int) round(microtime(true) * 1000);
    $encoded = json_encode($current, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
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
        'updatedAt' => $current['updatedAt'],
        'newsletter' => $newsletter,
    ]);
}

gaeks_json(['status' => 'error', 'message' => 'Method not allowed.'], 405);
