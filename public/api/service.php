<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

$slug = (string) ($_GET['slug'] ?? '');
if (in_array($slug, ['freight-laut-fcl', 'freight-udara', 'ppjk-customs-clearance', 'undername-impor-pi'], true)) {
    require dirname(__DIR__) . '/landing.php';
    exit;
}
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
$body = '<div class="min-h-screen bg-[#f4f5f1] pt-16 text-[#12363a]"><section class="page-shell py-10 sm:py-14">'
    . '<a href="/layanan/" class="button-link">← Semua layanan</a>'
    . '<div class="mt-7 grid min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden border border-slate-200 bg-white lg:grid-cols-2"><div class="min-w-0 p-6 sm:p-10 lg:p-12">'
    . '<p class="section-label">' . $escape($service['category'] ?? '') . '</p>'
    . '<h1 class="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">' . $escape($title) . '</h1>'
    . '<p class="mt-5 text-lg font-semibold text-cyan-800">' . $escape($service['tagline'] ?? '') . '</p>'
    . '<p class="mt-5 text-base leading-7 text-slate-600">' . $escape($summary) . '</p>'
    . '<a class="button-primary mt-8" href="/kontak/">Minta estimasi →</a></div>'
    . '<img src="' . $escape($service['imageUrl'] ?? '') . '" alt="" width="960" height="640" class="min-h-[280px] h-full w-full object-cover"></div>';
$features = array_values(array_filter($service['features'] ?? [], 'is_string'));
if ($features !== []) {
    $body .= '<section class="mt-8 border-b border-slate-300"><h2 class="border-t border-slate-300 py-5 font-bold">Ruang lingkup</h2><ul class="grid gap-3 pb-7 sm:grid-cols-2">';
    foreach ($features as $feature) $body .= '<li class="text-sm leading-6 text-slate-600">✓ ' . $escape($feature) . '</li>';
    $body .= '</ul></section>';
}
if ($compare !== []) {
    $body .= '<section class="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><h2 class="font-display text-2xl font-bold tracking-tight">Perbandingan pilihan</h2><div class="mt-6 overflow-x-auto"><table class="w-full min-w-[620px] border-collapse text-left text-sm"><thead><tr><th>Pilihan</th><th>Sesuai untuk</th><th>Data awal</th></tr></thead><tbody>';
    foreach ($compare as $row) $body .= '<tr class="border-b border-slate-100"><th class="px-3 py-4 font-semibold">' . $escape($row[0]) . '</th><td class="px-3 py-4">' . $escape($row[1]) . '</td><td class="px-3 py-4">' . $escape($row[2]) . '</td></tr>';
    $body .= '</tbody></table></div></section>';
}
if ($faq !== []) {
    $body .= '<section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><h2 class="font-display text-2xl font-bold tracking-tight">FAQ teknis logistik</h2><div class="mt-5 border-t border-slate-200">';
    foreach ($faq as $row) $body .= '<article class="border-b border-slate-200 py-4"><h3 class="font-semibold">' . $escape($row[0]) . '</h3><p class="mt-2 text-sm leading-6 text-slate-600">' . $escape($row[1]) . '</p></article>';
    $body .= '</div></section>';
}
$body .= '</section></div>';
$template = preg_replace_callback('/<div id="root">.*?<\/div>/s', static fn(): string => '<div id="root">' . $body . '</div>', $template, 1);
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: public, max-age=300');
echo $template;
