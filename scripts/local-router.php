<?php
declare(strict_types=1);

$root = realpath(__DIR__ . '/../dist');
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$file = $root . str_replace('/', DIRECTORY_SEPARATOR, rawurldecode($path));

if ($path === '/sitemap.xml') {
    require $root . '/api/sitemap.php';
    return true;
}
if (preg_match('~^/berita/([a-z0-9-]+)/?$~i', $path, $match)) {
    $_GET['slug'] = $match[1];
    require $root . '/api/article.php';
    return true;
}
if (preg_match('~^/layanan/([a-z0-9-]+)/?$~i', $path, $match)) {
    $_GET['slug'] = $match[1];
    require $root . '/api/service.php';
    return true;
}
if (is_file($file) && str_starts_with(realpath($file), $root . DIRECTORY_SEPARATOR)) {
    return false;
}
if ($path === '/' || preg_match('~^/(operator|tracking|layanan|rute-pengiriman|kalkulator|berita|kontak)/?$~', $path)) {
    header('Content-Type: text/html; charset=UTF-8');
    readfile($root . '/index.html');
    return true;
}
http_response_code(404);
echo 'Not found';
