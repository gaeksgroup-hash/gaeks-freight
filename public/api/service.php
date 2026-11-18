<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

$slug = (string) ($_GET['slug'] ?? '');
$aliases = ['ppjk' => 'ppjk-customs-clearance', 'gudang-pbm' => 'pergudangan-stevedoring', 'domestic-truck' => 'trucking', 'project-cargo' => 'project-cargo-heavy-lift', 'lcl' => 'freight-laut-lcl', 'fcl' => 'freight-laut-fcl', 'air-shipment' => 'freight-udara'];
gaeks_seed_private_json(gaeks_content_file(), __DIR__ . '/site_content.json');
$content = gaeks_read_json_file(gaeks_content_file(), []);
$defaults = gaeks_read_json_file(__DIR__ . '/site_content.json', []);
$service = null;
foreach (($content['services'] ?? []) as $candidate) {
    if (!is_array($candidate)) continue;
    $id = (string) ($candidate['id'] ?? '');
    if (($aliases[$id] ?? $id) === $slug) { $service = $candidate; break; }
}
if ($service === null) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=UTF-8');
    echo 'Layanan tidak ditemukan.';
    exit;
}
foreach (($defaults['services'] ?? []) as $candidate) {
    if (($candidate['id'] ?? '') !== ($service['id'] ?? '')) continue;
    foreach (['summary', 'compare', 'faq'] as $field) {
        if (empty($service[$field])) $service[$field] = $candidate[$field] ?? ($field === 'summary' ? '' : []);
    }
    break;
}
$template = @file_get_contents(dirname(__DIR__) . '/index.html');
if ($template === false) { http_response_code(503); echo 'Halaman belum tersedia.'; exit; }
$escape = static fn($value): string => htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$url = GAEKS_SITE_URL . '/layanan/' . rawurlencode($slug) . '/';
$title = (string) ($service['title'] ?? 'Layanan GAEKS');
$summary = (string) ($service['summary'] ?? $service['description'] ?? '');
$faq = array_values(array_filter($service['faq'] ?? [], static fn($row): bool => is_array($row) && count($row) >= 2));
$compare = array_values(array_filter($service['compare'] ?? [], static fn($row): bool => is_array($row) && count($row) >= 3));
$graph = [
    ['@type' => 'Service', 'name' => $title, 'serviceType' => (string) ($service['category'] ?? ''), 'description' => $summary, 'provider' => ['@type' => 'Organization', 'name' => 'GAEKS Freight', 'url' => GAEKS_SITE_URL], 'areaServed' => ['@type' => 'Country', 'name' => 'Indonesia'], 'url' => $url],
    ['@type' => 'BreadcrumbList', 'itemListElement' => [
        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Beranda', 'item' => GAEKS_SITE_URL . '/'],
        ['@type' => 'ListItem', 'position' => 2, 'name' => 'Layanan', 'item' => GAEKS_SITE_URL . '/layanan/'],
        ['@type' => 'ListItem', 'position' => 3, 'name' => $title, 'item' => $url],
    ]],
];
if ($faq !== []) $graph[] = ['@type' => 'FAQPage', 'mainEntity' => array_map(static fn($row): array => ['@type' => 'Question', 'name' => (string) $row[0], 'acceptedAnswer' => ['@type' => 'Answer', 'text' => (string) $row[1]]], $faq)];
$template = preg_replace_callback('/<title>.*?<\/title>/s', static fn(): string => '<title>' . $escape($title) . ' | GAEKS Freight</title>', $template, 1);
$template = preg_replace('/\s*<meta name="description"[^>]*\/>/', '', $template);
$template = preg_replace('/\s*<link rel="canonical"[^>]*\/>/', '', $template);
$template = preg_replace('/\s*<meta property="og:(?:type|url|title|description|image)"[^>]*\/>/', '', $template);
$template = preg_replace('/\s*<script type="application\/ld\+json">.*?<\/script>/s', '', $template);
$template = preg_replace('/\s*<link rel="preload" as="image"[^>]*\/>/', '', $template);
$head = '<meta name="description" content="' . $escape($summary) . '"><link rel="canonical" href="' . $escape($url) . '">'
    . '<meta property="og:type" content="website"><meta property="og:url" content="' . $escape($url) . '">'
    . '<meta property="og:title" content="' . $escape($title) . '"><meta property="og:description" content="' . $escape($summary) . '">'
    . '<script type="application/ld+json">' . str_replace('<', '\\u003c', (string) json_encode(['@context' => 'https://schema.org', '@graph' => $graph], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) . '</script>';
$template = str_replace('</head>', $head . "\n</head>", $template);
$body = '<main style="max-width:960px;margin:0 auto;padding:8rem 1.5rem 4rem;color:#12363a;font-family:Arial,sans-serif"><h1>' . $escape($title) . '</h1><p>' . $escape($summary) . '</p>';
if ($compare !== []) {
    $body .= '<section><h2>Perbandingan pilihan</h2><table><thead><tr><th>Pilihan</th><th>Sesuai untuk</th><th>Data awal</th></tr></thead><tbody>';
    foreach ($compare as $row) $body .= '<tr><th>' . $escape($row[0]) . '</th><td>' . $escape($row[1]) . '</td><td>' . $escape($row[2]) . '</td></tr>';
    $body .= '</tbody></table></section>';
}
if ($faq !== []) {
    $body .= '<section><h2>FAQ teknis logistik</h2>';
    foreach ($faq as $row) $body .= '<article><h3>' . $escape($row[0]) . '</h3><p>' . $escape($row[1]) . '</p></article>';
    $body .= '</section>';
}
$body .= '<p><a href="/kontak/">Minta penawaran</a></p></main>';
$template = preg_replace_callback('/<div id="root">.*?<\/div>/s', static fn(): string => '<div id="root">' . $body . '</div>', $template, 1);
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: public, max-age=300');
echo $template;
