<?php
declare(strict_types=1);

require_once __DIR__ . '/_article.php';

$slug = (string) ($_GET['slug'] ?? '');
$article = null;
foreach (gaeks_published_articles() as $candidate) {
    if (hash_equals(gaeks_article_slug($candidate), $slug)) { $article = $candidate; break; }
    if (!empty($candidate['slug']) && hash_equals((string) $candidate['slug'], $slug)) {
        header('Location: ' . gaeks_article_url($candidate), true, 301);
        exit;
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
$url = gaeks_article_url($article);
$title = (string) $article['title'];
$description = (string) ($article['excerpt'] ?? '');
$image = (string) ($article['imageUrl'] ?? '');
if (str_starts_with($image, '/')) $image = GAEKS_SITE_URL . $image;
$structured = [
    '@context' => 'https://schema.org',
    '@type' => 'NewsArticle',
    'headline' => $title,
    'description' => $description,
    'datePublished' => (string) ($article['publishedDate'] ?? ''),
    'dateModified' => (string) ($article['updatedAt'] ?? $article['publishedDate'] ?? ''),
    'image' => $image,
    'author' => ['@type' => 'Organization', 'name' => (string) ($article['author'] ?? 'GAEKS Editorial')],
    'publisher' => ['@type' => 'Organization', 'name' => 'GAEKS Freight', 'url' => GAEKS_SITE_URL],
    'mainEntityOfPage' => $url,
];
$template = preg_replace_callback('/<title>.*?<\/title>/s', static fn(): string => '<title>' . $escape($title) . ' | GAEKS News</title>', $template, 1);
$template = preg_replace('/\s*<meta name="description"[^>]*\/>/', '', $template);
$template = preg_replace('/\s*<link rel="canonical"[^>]*\/>/', '', $template);
$template = preg_replace('/\s*<meta property="og:(?:type|url|title|description|image)"[^>]*\/>/', '', $template);
$template = preg_replace('/\s*<script type="application\/ld\+json">.*?<\/script>/s', '', $template);
$template = preg_replace('/\s*<link rel="preload" as="image"[^>]*\/>/', '', $template);
$head = '<meta name="description" content="' . $escape($description) . '">' . "\n"
    . '<link rel="canonical" href="' . $escape($url) . '">' . "\n"
    . '<meta property="og:type" content="article"><meta property="og:url" content="' . $escape($url) . '">' . "\n"
    . '<meta property="og:title" content="' . $escape($title) . '"><meta property="og:description" content="' . $escape($description) . '">' . "\n"
    . '<meta property="og:image" content="' . $escape($image) . '">' . "\n"
    . '<script type="application/ld+json">' . str_replace('<', '\\u003c', (string) json_encode($structured, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) . '</script>';
$template = str_replace('</head>', $head . "\n</head>", $template);
$body = '<main style="max-width:960px;margin:0 auto;padding:8rem 1.5rem 4rem;color:#12363a;font-family:Arial,sans-serif">'
    . '<p>' . $escape($article['category'] ?? 'Berita') . ' · ' . $escape($article['publishedDate'] ?? '') . '</p>'
    . '<h1>' . $escape($title) . '</h1><p>' . $escape($description) . '</p>';
foreach (preg_split('/\n\s*\n/', (string) ($article['content'] ?? '')) as $paragraph) {
    if (trim($paragraph) !== '') $body .= '<p style="line-height:1.8">' . nl2br($escape($paragraph)) . '</p>';
}
$body .= '<p><a href="/berita/">Lihat semua berita</a></p></main>';
$template = preg_replace_callback('/<div id="root">.*?<\/div>/s', static fn(): string => '<div id="root">' . $body . '</div>', $template, 1);
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: public, max-age=300');
echo $template;
