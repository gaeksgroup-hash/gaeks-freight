<?php
declare(strict_types=1);

require_once __DIR__ . '/_article.php';

$paths = ['/', '/layanan/', '/rute-pengiriman/', '/kalkulator/', '/tracking/', '/berita/', '/kontak/'];
$slugs = ['ppjk' => 'ppjk-customs-clearance', 'gudang-pbm' => 'pergudangan-stevedoring', 'domestic-truck' => 'trucking', 'project-cargo' => 'project-cargo-heavy-lift', 'lcl' => 'freight-laut-lcl', 'fcl' => 'freight-laut-fcl', 'air-shipment' => 'freight-udara', 'undername-impor' => 'undername-impor-pi'];
$content = gaeks_read_json_file(gaeks_content_file(), []);
$siteModified = gmdate('Y-m-d', max((int) @filemtime(gaeks_content_file()), (int) @filemtime(__DIR__ . '/site_content.json')));
foreach (($content['services'] ?? []) as $service) {
    if (!is_array($service) || empty($service['id'])) continue;
    $id = (string) $service['id'];
    $paths[] = '/layanan/' . rawurlencode($slugs[$id] ?? $id) . '/';
}
if (!in_array('/layanan/undername-impor-pi/', $paths, true)) $paths[] = '/layanan/undername-impor-pi/';
$urls = array_map(static fn(string $path): array => [GAEKS_SITE_URL . $path, $siteModified], $paths);
foreach (gaeks_published_articles() as $article) {
    $urls[] = [gaeks_article_url($article), (string) ($article['updatedAt'] ?? $article['publishedDate'] ?? gmdate('Y-m-d'))];
}
header('Content-Type: application/xml; charset=UTF-8');
header('Cache-Control: public, max-age=300');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as [$url, $date]) {
    echo '<url><loc>' . htmlspecialchars($url, ENT_XML1, 'UTF-8') . '</loc><lastmod>' . htmlspecialchars(substr($date, 0, 10), ENT_XML1, 'UTF-8') . '</lastmod></url>' . "\n";
}
echo '</urlset>';
