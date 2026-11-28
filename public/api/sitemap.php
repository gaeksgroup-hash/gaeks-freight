<?php
declare(strict_types=1);

require_once __DIR__ . '/_article.php';
require_once __DIR__ . '/_search_intelligence.php';

$si = gaeks_load_search_intelligence();
$routes = is_array($si['routes'] ?? null) ? $si['routes'] : [];
$base = gaeks_base_url();
$paths = [];
foreach ($routes as $routePath => $meta) {
    $paths[] = (string) $routePath;
    if (!empty($meta['enAvailable'])) {
        $paths[] = $routePath === '/' ? '/en/' : '/en' . $routePath;
    }
}
if (!$paths) {
    $paths = ['/', '/layanan/', '/rute-pengiriman/', '/kalkulator/', '/tarif-pengiriman/', '/maskapai-dan-pelayaran/', '/tentang-kami/', '/karier/', '/tracking/', '/berita/', '/kontak/', '/kontak/telepon/', '/terms-of-use/', '/privacy-terms/'];
}
$content = gaeks_read_json_file(gaeks_content_file(), []);
$siteModified = gmdate('Y-m-d', max((int) @filemtime(gaeks_content_file()), (int) @filemtime(__DIR__ . '/site_content.json')));
foreach (($content['services'] ?? []) as $service) {
    if (!is_array($service) || empty($service['id']) || ($service['status'] ?? 'published') !== 'published') continue;
    $id = (string) $service['id'];
    $servicePath = !empty($service['canonical']) ? parse_url((string) $service['canonical'], PHP_URL_PATH) : '/layanan/' . rawurlencode(gaeks_service_slug($id)) . '/';
    if ($servicePath) {
        $paths[] = $servicePath;
        $paths[] = '/en' . $servicePath;
    }
}
$paths = array_values(array_unique($paths));

$urls = array_map(static fn(string $path): array => [$base . $path, $siteModified], $paths);
foreach (gaeks_published_articles() as $article) {
    $urls[] = [gaeks_article_url($article), (string) ($article['updatedAt'] ?? $article['publishedDate'] ?? gmdate('Y-m-d'))];
}
header('Content-Type: application/xml; charset=UTF-8');
header('Cache-Control: no-cache, must-revalidate');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as [$url, $date]) {
    echo '<url><loc>' . htmlspecialchars($url, ENT_XML1, 'UTF-8') . '</loc><lastmod>' . htmlspecialchars(substr($date, 0, 10), ENT_XML1, 'UTF-8') . '</lastmod></url>' . "\n";
}
echo '</urlset>';
