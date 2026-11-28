<?php
declare(strict_types=1);
require_once __DIR__ . '/_bootstrap.php';
require_once __DIR__ . '/_search_intelligence.php';

$content = gaeks_public_content(gaeks_read_json_file(gaeks_content_file(), []));
$slug = preg_replace('/[^a-z0-9-]/', '', strtolower((string) ($_GET['slug'] ?? '')));
$langCode = strtolower((string) ($_GET['lang'] ?? 'id')) === 'en' ? 'en' : 'id';
$service = null;
foreach ($content['services'] as $item) {
    if (($item['id'] ?? '') === $slug || gaeks_service_slug((string) ($item['id'] ?? '')) === $slug) {
        $service = $item;
        break;
    }
}
if (!$service) {
    http_response_code(404);
    header('X-Robots-Tag: noindex');
    echo 'Layanan tidak ditemukan atau belum diterbitkan.';
    exit;
}

$s = $service;
$e = static fn($v): string => htmlspecialchars((string) $v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$isEn = $langCode === 'en';
$base = gaeks_base_url();
$sid = (string) ($s['id'] ?? '');
$canonSlug = gaeks_service_slug($sid);
$idUrl = !empty($s['canonical']) ? (string) $s['canonical'] : ($base . '/layanan/' . $canonSlug . '/');
$enUrl = $base . '/en/layanan/' . $canonSlug . '/';
$url = $isEn ? $enUrl : $idUrl;
$path = ($isEn ? '/en' : '') . '/layanan/' . $canonSlug . '/';
$alternateLinks = gaeks_si_alternate_links($idUrl, $enUrl);

$copy = array_replace(gaeks_read_json_file(__DIR__ . '/ui_copy_seed.json', []), $content['siteSettings']['uiCopy'] ?? []);
$title = $isEn
    ? ((string) ($s['seoTitle_en'] ?? '') ?: ($s['title'] . ' | GAEKS Freight Indonesia'))
    : ((string) ($s['seoTitle'] ?? '') ?: ($s['title'] . ' | GAEKS Freight'));
$description = $isEn
    ? ((string) ($s['metaDescription_en'] ?? '') ?: ((string) ($s['summary_en'] ?? $s['summary'] ?? $s['description'] ?? '')))
    : ((string) ($s['metaDescription'] ?? '') ?: ((string) ($s['summary'] ?? $s['description'] ?? '')));

$rawDir = strtolower((string) ($_GET['direction'] ?? ''));
$direction = ($rawDir === 'impor' || $rawDir === 'ekspor') ? $rawDir : '';
$rawCity = strtolower((string) ($_GET['city'] ?? ''));
$city = $rawCity === 'jakarta' ? 'Jakarta' : ($rawCity === 'semarang' ? 'Semarang' : ($rawCity === 'surabaya' ? 'Surabaya' : ''));
$contact = gaeks_build_service_contact($content, $s, $copy, $direction, $city);
$heroSummary = $isEn
    ? (trim((string) ($s['heroSummary_en'] ?? '')) ?: (trim((string) ($s['landingDescription_en'] ?? '')) ?: (string) ($s['summary_en'] ?? $s['summary'] ?? '')))
    : (trim((string) ($s['heroSummary'] ?? '')) ?: (trim((string) ($s['landingDescription'] ?? '')) ?: (string) ($s['tagline'] ?? $s['description'] ?? '')));
$heading = $isEn
    ? ((string) ($s['landingTitle_en'] ?? '') ?: (string) $s['title'])
    : ((string) ($s['landingTitle'] ?? '') ?: (string) $s['title']);
$imageUrl = (string) ($s['imageUrl'] ?? $s['image'] ?? '/uploads/gaeks-hero-cargo-poster.webp');

$body = '<main class="service-detail"><header class="service-overview"><div class="page-shell"><nav aria-label="Breadcrumb" class="mb-4 text-sm"><a href="' . ($isEn ? '/en/' : '/') . '">' . ($isEn ? 'Home' : 'Beranda') . '</a> / <a href="' . ($isEn ? '/en/layanan/' : '/layanan/') . '">' . ($isEn ? 'Services' : 'Layanan') . '</a> / <span>' . $e($s['title']) . '</span></nav><div class="service-overview-grid"><div class="service-intro"><p class="service-category">' . $e($s['category'] ?? '') . '</p><h1>' . $e($heading) . '</h1><p class="service-summary">' . $e($heroSummary) . '</p><div class="service-actions-row mt-7"><a class="service-hero-anchor" href="#service-quote-section">' . ($isEn ? 'Request Service Quote' : 'Ajukan Penawaran') . '</a></div></div><figure class="service-photo"><img width="960" height="800" fetchpriority="high" src="' . $e($imageUrl) . '" alt="' . $e($s['imageAlt'] ?? $s['title']) . '"><figcaption>' . $e($s['title']) . '</figcaption></figure></div></div></header><div class="page-shell service-content">';
foreach ($s['sections'] ?? [] as $section) {
    $secTitle = (string) ($section['title'] ?? $section['heading'] ?? '');
    $secBody = (string) ($section['body'] ?? '');
    if ($secTitle !== '' || $secBody !== '') {
        $body .= '<section class="my-8"><h2 class="text-2xl font-bold">' . $e($secTitle) . '</h2><p class="mt-4 whitespace-pre-line leading-7">' . $e($secBody) . '</p></section>';
    }
}
$body .= '<section class="my-8"><h2>' . $e($copy['scopeHeading'] ?? 'Ruang Lingkup Layanan') . '</h2><ul>';
foreach ($s['features'] ?? ($s['details'] ?? []) as $feature) {
    $body .= '<li>' . $e($feature) . '</li>';
}
$body .= '</ul><p>' . $e($s['equipment'] ?? '') . '</p><p>' . $e($s['commodities'] ?? '') . '</p></section>';
$compareRows = $s['compare'] ?? $s['compareRows'] ?? [];
if (!empty($compareRows)) {
    $body .= '<section class="my-8 overflow-x-auto"><h2>Perbandingan pilihan</h2><table><thead><tr><th>Pilihan</th><th>Sesuai untuk</th><th>Data awal</th></tr></thead><tbody>';
    foreach ($compareRows as $row) {
        $body .= '<tr>';
        foreach ($row as $cell) {
            $body .= '<td class="p-3">' . $e($cell) . '</td>';
        }
        $body .= '</tr>';
    }
    $body .= '</tbody></table></section>';
}
foreach ($s['evidence'] ?? [] as $p) {
    $body .= '<section class="my-6 bg-white p-6"><h2>' . $e($p['title']) . '</h2><p>' . $e($p['detail']) . '</p><p>' . $e($p['source']) . ' · ' . $e($p['date']) . '</p></section>';
}
$faqRows = $s['faq'] ?? $s['faqs'] ?? [];
if (!empty($faqRows)) {
    $body .= '<section><h2>' . $e($copy['faqHeading'] ?? 'Pertanyaan yang Sering Diajukan') . '</h2>';
    foreach ($faqRows as $row) {
        $q = (string) ($row[0] ?? $row['q'] ?? $row['question'] ?? '');
        $a = (string) ($row[1] ?? $row['a'] ?? $row['answer'] ?? '');
        if ($q !== '' && $a !== '') {
            $body .= '<details class="border-b py-4"><summary>' . $e($q) . '</summary><p>' . $e($a) . '</p></details>';
        }
    }
    $body .= '</section>';
}

$relations = gaeks_si_service_relations()[$sid] ?? ['relatedServices' => []];
$servicesById = [];
foreach ($content['services'] as $item) {
    if (!empty($item['id'])) {
        $servicesById[(string) $item['id']] = $item;
    }
}
if (!empty($relations['relatedServices'])) {
    $body .= '<section class="my-8"><h2>' . ($isEn ? 'Related Services & Tools' : 'Layanan & Alat Terkait') . '</h2><ul>';
    foreach ($relations['relatedServices'] as $relId) {
        if (!isset($servicesById[$relId])) continue;
        $rel = $servicesById[$relId];
        $relHref = ($isEn ? '/en' : '') . '/layanan/' . gaeks_service_slug((string) $relId) . '/';
        $body .= '<li><a href="' . $e($relHref) . '">' . $e((string) $rel['title']) . '</a></li>';
    }
    $body .= '<li><a href="/kalkulator/">Kalkulator CBM &amp; Volumetrik</a></li><li><a href="/rute-pengiriman/">Rute Pengiriman</a></li><li><a href="/tracking/">Pelacakan Pengiriman</a></li></ul></section>';
}
$body .= '<section id="service-quote-section" class="my-8"><h2>' . ($isEn ? 'Request Service Quote &amp; Desk Contact' : 'Konsultasi &amp; Penawaran Layanan') . '</h2><p><a class="service-primary" href="' . $e($contact['whatsappUrl']) . '">' . $e($contact['whatsappLabel']) . '</a> · <a class="service-email-cta" href="' . $e($contact['emailUrl']) . '">' . $e($contact['emailLabel']) . ' (' . $e($contact['email']) . ')</a></p></section></div></main>';

$orgSchema = gaeks_si_organization_schema();
$points = gaeks_si_contact_points($content);
if ($points) $orgSchema['contactPoint'] = $points;
$graph = [
    $orgSchema,
    gaeks_si_local_business_schema(),
    gaeks_si_website_schema(),
    [
        '@type' => 'WebPage',
        '@id' => $url . '#webpage',
        'url' => $url,
        'name' => $title,
        'description' => $description,
        'inLanguage' => $isEn ? 'en' : 'id-ID',
        'isPartOf' => ['@id' => $base . '/#website'],
        'about' => ['@id' => $url . '#service'],
    ],
    gaeks_si_service_schema($s, $url, $langCode),
    gaeks_si_breadcrumb_schema([
        ['name' => $isEn ? 'Home' : 'Beranda', 'item' => $base . ($isEn ? '/en/' : '/')],
        ['name' => $isEn ? 'Services' : 'Layanan', 'item' => $base . ($isEn ? '/en/layanan/' : '/layanan/')],
        ['name' => (string) $s['title'], 'item' => $url],
    ]),
];
if (!empty($faqRows)) {
    $mainEntity = [];
    foreach ($faqRows as $row) {
        $q = trim((string) ($row[0] ?? $row['q'] ?? $row['question'] ?? ''));
        $a = trim((string) ($row[1] ?? $row['a'] ?? $row['answer'] ?? ''));
        if ($q !== '' && $a !== '') {
            $mainEntity[] = ['@type' => 'Question', 'name' => $q, 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $a]];
        }
    }
    if ($mainEntity) {
        $graph[] = ['@type' => 'FAQPage', '@id' => $url . '#faq', 'mainEntity' => $mainEntity];
    }
}
require __DIR__ . '/_page_template.php';
