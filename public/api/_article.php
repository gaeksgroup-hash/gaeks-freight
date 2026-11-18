<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

function gaeks_article_slug(array $article): string
{
    $stored = (string) ($article['slug'] ?? '');
    if ($stored !== '' && !str_starts_with($stored, 'analisis-komprehensif-logistik-maritim-')) {
        return $stored;
    }
    $title = (string) ($article['title'] ?? 'berita');
    $normalized = function_exists('iconv') ? iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $title) : $title;
    $normalized = $normalized === false ? $title : $normalized;
    $slug = trim((string) preg_replace('/[^a-z0-9]+/', '-', strtolower($normalized)), '-');
    return substr($slug ?: 'berita', 0, 96) . '-' . strtolower((string) preg_replace('/[^a-zA-Z0-9-]/', '', (string) ($article['id'] ?? '')));
}

function gaeks_published_articles(): array
{
    gaeks_seed_private_json(gaeks_content_file(), __DIR__ . '/site_content.json');
    $content = gaeks_read_json_file(gaeks_content_file(), []);
    return array_values(array_filter($content['articles'] ?? [], static fn($article): bool => is_array($article)
        && ($article['status'] ?? 'published') === 'published'
        && (string) ($article['publishedDate'] ?? '') <= gmdate('Y-m-d')));
}

function gaeks_article_url(array $article): string
{
    return GAEKS_SITE_URL . '/berita/' . rawurlencode(gaeks_article_slug($article)) . '/';
}
