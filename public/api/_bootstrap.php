<?php
declare(strict_types=1);

const GAEKS_OPERATOR_USER = 'Gaekadmin';
const GAEKS_OPERATOR_SALT = '6529b5f4f03769166903435f1ab63510';
const GAEKS_OPERATOR_HASH = 'c929656e2923aa18685bc81f39c66c322248d7087103e92a921030187eb09a17';
const GAEKS_OPERATOR_ITERATIONS = 210000;
const GAEKS_NEWS_FROM = 'news@gaeks.com';
const GAEKS_SITE_URL = 'https://gaeks.com';

function gaeks_json(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store, max-age=0');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function gaeks_start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    session_name('gaeks_operator');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
}

function gaeks_operator_credentials_valid(string $username, string $password): bool
{
    if (!hash_equals(GAEKS_OPERATOR_USER, trim($username))) {
        return false;
    }

    $derived = hash_pbkdf2(
        'sha256',
        $password,
        hex2bin(GAEKS_OPERATOR_SALT),
        GAEKS_OPERATOR_ITERATIONS,
        64,
        false
    );

    return hash_equals(GAEKS_OPERATOR_HASH, $derived);
}

function gaeks_csrf_token(): string
{
    gaeks_start_session();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(24));
    }
    return (string) $_SESSION['csrf'];
}

function gaeks_require_operator(bool $requireCsrf = false): void
{
    gaeks_start_session();
    if (empty($_SESSION['operator_authenticated'])) {
        gaeks_json(['status' => 'error', 'message' => 'Sesi operator diperlukan.'], 401);
    }

    if ($requireCsrf) {
        $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
        if ($provided === '' || !hash_equals((string) ($_SESSION['csrf'] ?? ''), $provided)) {
            gaeks_json(['status' => 'error', 'message' => 'Token keamanan tidak valid.'], 403);
        }
    }
}

function gaeks_read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 1500000) {
        gaeks_json(['status' => 'error', 'message' => 'Payload tidak valid.'], 400);
    }
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        gaeks_json(['status' => 'error', 'message' => 'JSON tidak valid.'], 400);
    }
    return $decoded;
}

function gaeks_private_dir(): string
{
    $directory = dirname(__DIR__, 2) . '/gaeks-private';
    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        gaeks_json(['status' => 'error', 'message' => 'Penyimpanan privat belum tersedia.'], 503);
    }
    return $directory;
}

function gaeks_read_json_file(string $path, array $fallback = []): array
{
    if (!is_file($path)) {
        return $fallback;
    }
    $decoded = json_decode((string) file_get_contents($path), true);
    return is_array($decoded) ? $decoded : $fallback;
}

function gaeks_write_json_file(string $path, array $data): bool
{
    $temporary = $path . '.tmp.' . bin2hex(random_bytes(4));
    $encoded = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($encoded === false || @file_put_contents($temporary, $encoded, LOCK_EX) === false) {
        return false;
    }
    @chmod($temporary, 0600);
    if (!@rename($temporary, $path)) {
        @unlink($temporary);
        return false;
    }
    return true;
}

function gaeks_subscribers_file(): string
{
    return gaeks_private_dir() . '/newsletter_subscribers.json';
}

function gaeks_subscribers(): array
{
    return gaeks_read_json_file(gaeks_subscribers_file(), []);
}

function gaeks_save_subscribers(array $subscribers): bool
{
    return gaeks_write_json_file(gaeks_subscribers_file(), array_values($subscribers));
}

function gaeks_public_subscriber(array $subscriber): array
{
    return [
        'email' => (string) ($subscriber['email'] ?? ''),
        'status' => (string) ($subscriber['status'] ?? 'pending'),
        'subscribedAt' => (string) ($subscriber['subscribedAt'] ?? ''),
        'confirmedAt' => $subscriber['confirmedAt'] ?? null,
        'unsubscribedAt' => $subscriber['unsubscribedAt'] ?? null,
    ];
}

function gaeks_email_header(string $value): string
{
    return str_replace(["\r", "\n"], '', trim($value));
}

function gaeks_send_html_mail(string $to, string $subject, string $html, ?string $unsubscribeUrl = null): bool
{
    if (!filter_var($to, FILTER_VALIDATE_EMAIL) || !function_exists('mail')) {
        return false;
    }

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'From: GAEKS News <' . GAEKS_NEWS_FROM . '>',
        'Reply-To: ' . GAEKS_NEWS_FROM,
        'X-Mailer: GAEKS Newsletter',
    ];
    if ($unsubscribeUrl) {
        $headers[] = 'List-Unsubscribe: <' . gaeks_email_header($unsubscribeUrl) . '>, <mailto:' . GAEKS_NEWS_FROM . '?subject=unsubscribe>';
        $headers[] = 'List-Unsubscribe-Post: List-Unsubscribe=One-Click';
        $headers[] = 'Precedence: bulk';
    }

    $encodedSubject = '=?UTF-8?B?' . base64_encode(gaeks_email_header($subject)) . '?=';
    $headerText = implode("\r\n", $headers);
    if (@mail($to, $encodedSubject, $html, $headerText, '-f' . GAEKS_NEWS_FROM)) {
        return true;
    }
    return @mail($to, $encodedSubject, $html, $headerText);
}

function gaeks_token_url(string $action, string $token): string
{
    return GAEKS_SITE_URL . '/api/newsletter.php?action=' . rawurlencode($action) . '&token=' . rawurlencode($token);
}

function gaeks_newsletter_template(string $eyebrow, string $title, string $body, string $actionLabel, string $actionUrl, ?string $unsubscribeUrl = null): string
{
    $footer = $unsubscribeUrl
        ? '<p style="margin:20px 0 0;color:#64748b;font-size:12px;line-height:18px">Anda menerima email ini karena berlangganan pembaruan GAEKS. <a href="' . htmlspecialchars($unsubscribeUrl, ENT_QUOTES, 'UTF-8') . '" style="color:#0e7490">Berhenti berlangganan</a>.</p>'
        : '<p style="margin:20px 0 0;color:#64748b;font-size:12px;line-height:18px">Email ini dikirim untuk mengonfirmasi permintaan langganan Anda.</p>';

    return '<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
        . '<body style="margin:0;background:#f4f5f1;font-family:Arial,sans-serif;color:#12363a"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f5f1"><tr><td align="center" style="padding:28px 16px">'
        . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #d8dfdd"><tr><td style="padding:24px 28px 12px;background:#082f34;color:#ffffff"><strong style="font-size:20px;letter-spacing:.04em">GAEKS</strong><span style="float:right;font-size:12px;color:#8bdceb">NEWS</span></td></tr>'
        . '<tr><td style="padding:30px 28px"><p style="margin:0 0 12px;color:#0e7490;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">' . htmlspecialchars($eyebrow, ENT_QUOTES, 'UTF-8') . '</p>'
        . '<h1 style="margin:0 0 16px;font-size:28px;line-height:35px">' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</h1>'
        . '<p style="margin:0 0 24px;color:#475569;font-size:16px;line-height:25px">' . nl2br(htmlspecialchars($body, ENT_QUOTES, 'UTF-8')) . '</p>'
        . '<a href="' . htmlspecialchars($actionUrl, ENT_QUOTES, 'UTF-8') . '" style="display:inline-block;background:#0e6874;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 18px">' . htmlspecialchars($actionLabel, ENT_QUOTES, 'UTF-8') . '</a>'
        . $footer . '</td></tr></table></td></tr></table></body></html>';
}

function gaeks_broadcast_article(array $article): array
{
    $subscribers = gaeks_subscribers();
    $sent = 0;
    $failed = 0;
    $title = trim((string) ($article['title'] ?? 'Pembaruan GAEKS'));
    $excerpt = trim((string) ($article['excerpt'] ?? 'Baca pembaruan operasional terbaru dari GAEKS.'));
    $articleId = rawurlencode((string) ($article['id'] ?? ''));
    $articleUrl = GAEKS_SITE_URL . '/#news?id=' . $articleId;

    foreach ($subscribers as $subscriber) {
        if (($subscriber['status'] ?? '') !== 'active' || empty($subscriber['email']) || empty($subscriber['unsubscribeToken'])) {
            continue;
        }
        $unsubscribeUrl = gaeks_token_url('unsubscribe', (string) $subscriber['unsubscribeToken']);
        $html = gaeks_newsletter_template('Berita terbaru', $title, $excerpt, 'Baca artikel', $articleUrl, $unsubscribeUrl);
        if (gaeks_send_html_mail((string) $subscriber['email'], $title . ' | GAEKS News', $html, $unsubscribeUrl)) {
            $sent++;
        } else {
            $failed++;
        }
    }

    $logPath = gaeks_private_dir() . '/newsletter_delivery.json';
    $log = gaeks_read_json_file($logPath, []);
    array_unshift($log, [
        'articleId' => (string) ($article['id'] ?? ''),
        'title' => $title,
        'sent' => $sent,
        'failed' => $failed,
        'createdAt' => gmdate('c'),
    ]);
    gaeks_write_json_file($logPath, array_slice($log, 0, 100));

    return ['sent' => $sent, 'failed' => $failed];
}
