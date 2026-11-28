<?php
declare(strict_types=1);

$root = realpath(__DIR__ . '/../dist');
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$query = (string) (parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_QUERY) ?? '');
$norm = rtrim($path, '/') ?: '/';

$redirects = [
    '/carrier' => '/maskapai-dan-pelayaran/',
    '/karir' => '/karier/',
    '/rate' => '/tarif-pengiriman/',
    '/about' => '/tentang-kami/',
];
if (isset($redirects[$norm])) {
    header('Location: ' . $redirects[$norm], true, 301);
    return true;
}

if (str_starts_with($norm, '/operator')) {
    header('X-Robots-Tag: noindex, nofollow, noarchive');
    if (is_file($root . '/operator/index.html')) {
        header('Content-Type: text/html; charset=UTF-8');
        readfile($root . '/operator/index.html');
        return true;
    }
} elseif ($norm === '/tracking' && $query !== '') {
    header('X-Robots-Tag: noindex, nofollow');
}

$ssrPages = ['', '/layanan', '/kontak', '/kontak/telepon', '/en', '/en/layanan', '/en/kontak', '/en/tentang-kami', '/en/tarif-pengiriman'];
if (in_array(rtrim($path, '/'), $ssrPages, true)) {
    require $root . '/api/page.php';
    return true;
}

if ($path === '/sitemap.xml') {
    require $root . '/api/sitemap.php';
    return true;
}
if (preg_match('~^/berita/([a-z0-9-]+)/?$~i', $path, $match)) {
    $_GET['slug'] = $match[1];
    require $root . '/api/article.php';
    return true;
}
if (preg_match('~^/en/layanan/([a-z0-9-]+)/?$~i', $path, $match)) {
    $_GET['slug'] = $match[1];
    $_GET['lang'] = 'en';
    require $root . '/api/service.php';
    return true;
}
if (preg_match('~^/layanan/([a-z0-9-]+)/?$~i', $path, $match)) {
    $_GET['slug'] = $match[1];
    require $root . '/api/service.php';
    return true;
}
$file = $root . str_replace('/', DIRECTORY_SEPARATOR, rawurldecode($path));
if (is_dir($file) && is_file($file . DIRECTORY_SEPARATOR . 'index.html') && str_starts_with(realpath($file), $root)) {
    header('Content-Type: text/html; charset=UTF-8');
    readfile($file . DIRECTORY_SEPARATOR . 'index.html');
    return true;
}
if (is_file($file) && str_starts_with(realpath($file), $root . DIRECTORY_SEPARATOR)) {
    return false;
}
if ($path === '/' || preg_match('~^/(?:en/)?(operator|tracking|layanan|rute-pengiriman|kalkulator|tarif-pengiriman|maskapai-dan-pelayaran|tentang-kami|karier|berita|kontak|terms-of-use|privacy-terms)(?:/[a-z0-9-]+)?/?$~', $path)) {
    header('Content-Type: text/html; charset=UTF-8');
    readfile($root . '/index.html');
    return true;
}
http_response_code(404);
echo 'Not found';
