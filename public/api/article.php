<?php
declare(strict_types=1);

require_once __DIR__ . '/_article.php';
require_once __DIR__ . '/_search_intelligence.php';

$slug = (string) ($_GET['slug'] ?? '');
$article = null;
foreach (gaeks_published_articles() as $candidate) {
    if (hash_equals(gaeks_article_slug($candidate), $slug)) {
        $article = $candidate;
        break;
    }
    if (!empty($candidate['slug']) && hash_equals((string) $candidate['slug'], $slug)) {
        header('Location: ' . gaeks_article_url($candidate), true, 301);
        exit;
    }
}
if ($article === null && preg_match('/^analisis-komprehensif-logistik-maritim-(\d+)$/', $slug, $m)) {
    $legacyId = 'art-' . $m[1];
    foreach (gaeks_published_articles() as $candidate) {
        if (($candidate['id'] ?? '') === $legacyId) {
            header('Location: ' . gaeks_article_url($candidate), true, 301);
            exit;
        }
    }
}
if ($article === null) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=UTF-8');
    echo 'Artikel tidak ditemukan.';
    exit;
}
$templatePath = dirname(__DIR__) . '/index.html';
$template = @file_get_contents($templatePath);
if ($template === false) {
    http_response_code(503);
    echo 'Halaman belum tersedia.';
    exit;
}
$escape = static fn($value): string => htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$base = gaeks_base_url();
$url = gaeks_article_url($article);
$title = (string) $article['title'];
$description = (string) ($article['excerpt'] ?? '');
$image = (string) ($article['imageUrl'] ?? '');
if (str_starts_with($image, '/')) $image = $base . $image;

$siteContent = gaeks_read_json_file(gaeks_content_file(), []);
$orgSchema = gaeks_si_organization_schema();
$points = gaeks_si_contact_points($siteContent);
if ($points) $orgSchema['contactPoint'] = $points;

$graph = [
    $orgSchema,
    gaeks_si_website_schema(),
    [
        '@type' => 'WebPage',
        '@id' => $url . '#webpage',
        'url' => $url,
        'name' => $title . ' | GAEKS News',
        'description' => $description,
        'inLanguage' => 'id-ID',
        'isPartOf' => ['@id' => $base . '/#website'],
    ],
    [
        '@type' => 'NewsArticle',
        '@id' => $url . '#article',
        'headline' => $title,
        'description' => $description,
        'inLanguage' => 'id-ID',
        'datePublished' => (string) ($article['publishedDate'] ?? ''),
        'dateModified' => (string) ($article['updatedAt'] ?? $article['publishedDate'] ?? ''),
        'image' => $image,
        'author' => ['@type' => 'Organization', 'name' => (string) ($article['author'] ?? 'GAEKS Editorial'), 'url' => $base . '/'],
        'publisher' => ['@id' => $base . '/#organization'],
        'mainEntityOfPage' => ['@id' => $url . '#webpage'],
    ],
    gaeks_si_breadcrumb_schema([
        ['name' => 'Beranda', 'item' => $base . '/'],
        ['name' => 'Berita', 'item' => $base . '/berita/'],
        ['name' => $title, 'item' => $url],
    ]),
];

$template = preg_replace_callback('/<title>.*?<\/title>/s', static fn(): string => '<title>' . $escape($title) . ' | GAEKS News</title>', $template, 1);
$template = preg_replace('/\s*<meta name="(?:description|keywords|robots)"[^>]*\/?>/', '', $template);
$template = preg_replace('/\s*<link rel="(?:canonical|alternate|icon|shortcut icon|apple-touch-icon)"[^>]*\/?>/', '', $template);
$template = preg_replace('/\s*<meta property="og:(?:type|url|title|description|image|locale|site_name)"[^>]*\/?>/', '', $template);
$template = preg_replace('/\s*<script type="application\/ld\+json">.*?<\/script>/s', '', $template);
$template = preg_replace('/\s*<link rel="preload" as="image"[^>]*\/?>/', '', $template);

$robots = gaeks_staging_site() ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
$head = gaeks_head_favicon_tags($siteContent, $escape) . "\n"
    . '<meta name="description" content="' . $escape($description) . '">' . "\n"
    . '<meta name="robots" content="' . $escape($robots) . '">' . "\n"
    . '<link rel="canonical" href="' . $escape($url) . '">' . "\n"
    . '<link rel="alternate" hreflang="id-ID" href="' . $escape($url) . '">' . "\n"
    . '<link rel="alternate" hreflang="x-default" href="' . $escape($url) . '">' . "\n"
    . '<meta property="og:type" content="article"><meta property="og:locale" content="id_ID"><meta property="og:site_name" content="GAEKS Freight"><meta property="og:url" content="' . $escape($url) . '">' . "\n"
    . '<meta property="og:title" content="' . $escape($title) . '"><meta property="og:description" content="' . $escape($description) . '">' . "\n"
    . '<meta property="og:image" content="' . $escape($image) . '">' . "\n"
    . '<script type="application/ld+json">' . str_replace('<', '\\u003c', (string) json_encode(['@context' => 'https://schema.org', '@graph' => $graph], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) . '</script>';
$template = str_replace('</head>', $head . "\n</head>", $template);
$body = '<main style="max-width:960px;margin:0 auto;padding:8rem 1.5rem 4rem;color:#12363a;font-family:Arial,sans-serif">'
    . '<nav aria-label="Breadcrumb" style="font-size:.875rem;margin-bottom:1rem"><a href="/">Beranda</a> / <a href="/berita/">Berita</a> / <span>' . $escape($article['category'] ?? 'Artikel') . '</span></nav>'
    . '<p>' . $escape($article['category'] ?? 'Berita') . ' · ' . $escape($article['publishedDate'] ?? '') . '</p>'
    . '<h1>' . $escape($title) . '</h1><p>' . $escape($description) . '</p>';
foreach (preg_split('/\n\s*\n/', (string) ($article['content'] ?? '')) as $paragraph) {
    if (trim($paragraph) !== '') $body .= '<p style="line-height:1.8">' . nl2br($escape($paragraph)) . '</p>';
}
$body .= '<p><a href="/berita/">Lihat semua berita</a> · <a href="/layanan/">Lihat semua layanan GAEKS Freight</a></p></main>';
$template = preg_replace_callback('/<div id="root">.*?<\/div>/s', static fn(): string => '<div id="root">' . $body . '</div>', $template, 1);
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-cache, must-revalidate');
echo $template;
