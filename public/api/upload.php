<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$uploadDir = __DIR__ . '/../uploads';
$bundledLibraryFile = __DIR__ . '/media_library.json';
$libraryFile = gaeks_media_library_file();

gaeks_require_permission('media.manage', $_SERVER['REQUEST_METHOD'] !== 'GET');
gaeks_seed_private_json($libraryFile, $bundledLibraryFile);

if (!is_dir($uploadDir) && !@mkdir($uploadDir, 0755, true) && !is_dir($uploadDir)) {
    gaeks_json(['status' => 'error', 'message' => 'Folder media belum tersedia.'], 503);
}

function gaeks_media_size(int $bytes): string
{
    return $bytes >= 1048576
        ? round($bytes / 1048576, 2) . ' MB'
        : round($bytes / 1024, 1) . ' KB';
}

function gaeks_media_stem(string $name): string
{
    $stem = preg_replace('/[^a-zA-Z0-9_-]+/', '-', pathinfo($name, PATHINFO_FILENAME));
    $stem = trim((string) $stem, '-_');
    return $stem !== '' ? strtolower($stem) : 'media';
}

function gaeks_media_token(): string
{
    return time() . '-' . bin2hex(random_bytes(4));
}

function gaeks_remove_public_upload(string $url, string $uploadDir): void
{
    if (!str_starts_with($url, '/uploads/')) {
        return;
    }
    $path = $uploadDir . '/' . basename($url);
    if (is_file($path)) {
        @unlink($path);
    }
}

function gaeks_write_webp_with_gd(string $source, string $destination, int $maxDimension): bool
{
    if (!function_exists('imagecreatefromstring') || !function_exists('imagewebp')) {
        return false;
    }
    $raw = @file_get_contents($source);
    $image = $raw !== false ? @imagecreatefromstring($raw) : false;
    if ($image === false) {
        return false;
    }
    $width = imagesx($image);
    $height = imagesy($image);
    $scale = min(1, $maxDimension / max($width, $height));
    $targetWidth = max(1, (int) round($width * $scale));
    $targetHeight = max(1, (int) round($height * $scale));
    $output = imagecreatetruecolor($targetWidth, $targetHeight);
    imagealphablending($output, false);
    imagesavealpha($output, true);
    $transparent = imagecolorallocatealpha($output, 0, 0, 0, 127);
    imagefilledrectangle($output, 0, 0, $targetWidth, $targetHeight, $transparent);
    imagecopyresampled($output, $image, 0, 0, 0, 0, $targetWidth, $targetHeight, $width, $height);
    $written = @imagewebp($output, $destination, 82);
    imagedestroy($output);
    imagedestroy($image);
    return $written;
}

function gaeks_optimize_image(string $source, string $sourceName, string $uploadDir, int $maxDimension = 1920): array
{
    $extension = strtolower(pathinfo($sourceName, PATHINFO_EXTENSION));
    $stem = gaeks_media_token() . '-' . gaeks_media_stem($sourceName) . '-optimized';

    if ($extension === 'svg') {
        $svg = (string) @file_get_contents($source);
        if ($svg === '' || stripos($svg, '<svg') === false || preg_match('/<script|javascript:|\son\w+\s*=/i', $svg)) {
            throw new RuntimeException('SVG tidak lolos pemeriksaan keamanan.');
        }
        $svg = preg_replace('/<!--.*?-->/s', '', $svg) ?? $svg;
        $destination = $uploadDir . '/' . $stem . '.svg';
        if (@file_put_contents($destination, trim($svg), LOCK_EX) === false) {
            throw new RuntimeException('SVG belum dapat disimpan.');
        }
        return [$destination, '/uploads/' . basename($destination), 'vector'];
    }

    if (class_exists('Imagick')) {
        try {
            $image = new Imagick();
            $image->setResourceLimit(Imagick::RESOURCETYPE_MEMORY, 256 * 1024 * 1024);
            $image->readImage($source);
            if ($extension === 'gif' && $image->getNumberImages() > 1) {
                $frames = $image->coalesceImages();
                foreach ($frames as $frame) {
                    if (max($frame->getImageWidth(), $frame->getImageHeight()) > $maxDimension) {
                        $frame->thumbnailImage($maxDimension, $maxDimension, true, true);
                    }
                    $frame->stripImage();
                    $frame->setImageCompression(Imagick::COMPRESSION_LZW);
                    $frame->setImagePage(0, 0, 0, 0);
                }
                $destination = $uploadDir . '/' . $stem . '.gif';
                $frames = $frames->deconstructImages();
                if (!$frames->writeImages($destination, true)) {
                    throw new RuntimeException('GIF belum dapat dioptimalkan.');
                }
                $frames->clear();
                $image->clear();
                return [$destination, '/uploads/' . basename($destination), 'animated-gif'];
            }

            $image->setIteratorIndex(0);
            if (method_exists($image, 'autoOrient')) {
                $image->autoOrient();
            }
            if (max($image->getImageWidth(), $image->getImageHeight()) > $maxDimension) {
                $image->thumbnailImage($maxDimension, $maxDimension, true, true);
            }
            $image->stripImage();
            $image->setImageFormat('webp');
            $image->setImageCompressionQuality(82);
            $image->setOption('webp:method', '6');
            $destination = $uploadDir . '/' . $stem . '.webp';
            if (!$image->writeImage($destination)) {
                throw new RuntimeException('Gambar belum dapat dioptimalkan.');
            }
            $image->clear();
            return [$destination, '/uploads/' . basename($destination), 'webp'];
        } catch (Throwable $error) {
            if ($extension === 'gif') {
                throw new RuntimeException('GIF belum dapat dioptimalkan: ' . $error->getMessage());
            }
        }
    }

    $destination = $uploadDir . '/' . $stem . '.webp';
    if (!gaeks_write_webp_with_gd($source, $destination, $maxDimension)) {
        throw new RuntimeException('Mesin optimasi gambar tidak tersedia.');
    }
    return [$destination, '/uploads/' . basename($destination), 'webp'];
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    gaeks_json([
        'status' => 'success',
        'files' => gaeks_read_json_file($libraryFile, []),
        'capabilities' => [
            'images' => class_exists('Imagick') ? 'imagick' : (function_exists('imagewebp') ? 'gd' : 'unavailable'),
            'video' => 'browser-webm',
            'maxVideoSeconds' => 90,
        ],
    ]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_GET['action'] ?? '') === 'delete') {
    $data = gaeks_read_json_body();
    $urlToDelete = (string) ($data['url'] ?? '');
    if ($urlToDelete === '') {
        gaeks_json(['status' => 'error', 'message' => 'Media tidak ditemukan.'], 400);
    }
    $list = gaeks_read_json_file($libraryFile, []);
    foreach ($list as $item) {
        if (is_array($item) && ($item['url'] ?? '') === $urlToDelete) {
            gaeks_remove_public_upload((string) $item['url'], $uploadDir);
            gaeks_remove_public_upload((string) ($item['posterUrl'] ?? ''), $uploadDir);
        }
    }
    $list = array_values(array_filter($list, static fn($item) => !is_array($item) || ($item['url'] ?? '') !== $urlToDelete));
    if (!gaeks_write_json_file($libraryFile, $list)) {
        gaeks_json(['status' => 'error', 'message' => 'Daftar media belum dapat diperbarui.'], 500);
    }
    gaeks_json(['status' => 'success', 'message' => 'Media dihapus.']);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    gaeks_json(['status' => 'error', 'message' => 'Upload gagal atau file kosong.'], 400);
}

$uploaded = $_FILES['file'];
$sourceName = basename((string) ($_POST['source_name'] ?? $uploaded['name']));
$temporaryPath = (string) $uploaded['tmp_name'];
$extension = strtolower(pathinfo((string) $uploaded['name'], PATHINFO_EXTENSION));
$mime = (new finfo(FILEINFO_MIME_TYPE))->file($temporaryPath) ?: '';
$originalBytes = max((int) ($_POST['original_size'] ?? 0), (int) $uploaded['size']);
$clientOptimized = ($_POST['client_optimized'] ?? '') === '1';

$imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'ico'];
$documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];
$type = in_array($extension, $documentExtensions, true) ? 'document' : (str_starts_with($mime, 'video/') || $extension === 'webm' ? 'video' : 'image');
$maximumBytes = $type === 'video' ? 100 * 1024 * 1024 : ($type === 'image' ? 20 * 1024 * 1024 : 25 * 1024 * 1024);
if ((int) $uploaded['size'] > $maximumBytes) {
    gaeks_json(['status' => 'error', 'message' => 'Ukuran file melewati batas media.'], 413);
}

$posterUrl = null;
$optimizationMode = '';
try {
    if ($type === 'video') {
        if (!$clientOptimized || $extension !== 'webm' || !in_array($mime, ['video/webm', 'video/x-matroska', 'application/octet-stream'], true)) {
            throw new RuntimeException('Video wajib dirender oleh optimizer operator sebelum dipublikasikan.');
        }
        $filename = gaeks_media_token() . '-' . gaeks_media_stem($sourceName) . '-optimized.webm';
        $destination = $uploadDir . '/' . $filename;
        if (!move_uploaded_file($temporaryPath, $destination)) {
            throw new RuntimeException('Hasil render video belum dapat disimpan.');
        }
        $publicUrl = '/uploads/' . $filename;
        $optimizationMode = 'webm-720p';
        if (isset($_FILES['poster']) && $_FILES['poster']['error'] === UPLOAD_ERR_OK) {
            [, $posterUrl] = gaeks_optimize_image((string) $_FILES['poster']['tmp_name'], (string) $_FILES['poster']['name'], $uploadDir, 1440);
        }
    } elseif ($type === 'image' && in_array($extension, $imageExtensions, true)) {
        [$destination, $publicUrl, $optimizationMode] = gaeks_optimize_image($temporaryPath, $sourceName, $uploadDir);
    } elseif ($type === 'document' && in_array($extension, $documentExtensions, true)) {
        $filename = gaeks_media_token() . '-' . gaeks_media_stem($sourceName) . '.' . $extension;
        $destination = $uploadDir . '/' . $filename;
        if (!move_uploaded_file($temporaryPath, $destination)) {
            throw new RuntimeException('Dokumen belum dapat disimpan.');
        }
        $publicUrl = '/uploads/' . $filename;
        $optimizationMode = 'document';
    } else {
        throw new RuntimeException('Format atau isi file tidak didukung.');
    }
} catch (Throwable $error) {
    gaeks_json(['status' => 'error', 'message' => $error->getMessage()], 422);
}

@chmod($destination, 0644);
$optimizedBytes = is_file($destination) ? (int) filesize($destination) : 0;
$savingsPercent = $originalBytes > 0 ? max(0, (int) round((1 - ($optimizedBytes / $originalBytes)) * 100)) : 0;
$mediaItem = [
    'id' => 'med-' . gaeks_media_token(),
    'name' => $sourceName,
    'url' => $publicUrl,
    'posterUrl' => $posterUrl,
    'type' => $type,
    'size' => gaeks_media_size($optimizedBytes),
    'originalBytes' => $originalBytes,
    'optimizedBytes' => $optimizedBytes,
    'savingsPercent' => $savingsPercent,
    'optimized' => $type !== 'document',
    'optimizationMode' => $optimizationMode,
    'uploadedAt' => gmdate('c'),
];

$list = gaeks_read_json_file($libraryFile, []);
array_unshift($list, $mediaItem);
if (!gaeks_write_json_file($libraryFile, array_slice($list, 0, 500))) {
    gaeks_remove_public_upload($publicUrl, $uploadDir);
    gaeks_remove_public_upload((string) $posterUrl, $uploadDir);
    gaeks_json(['status' => 'error', 'message' => 'Indeks media belum dapat disimpan.'], 500);
}

gaeks_json([
    'status' => 'success',
    'url' => $publicUrl,
    'posterUrl' => $posterUrl,
    'mediaItem' => $mediaItem,
]);
