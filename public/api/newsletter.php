<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

function newsletter_redirect(string $state): void
{
    header('Location: ' . GAEKS_SITE_URL . '/?newsletter=' . rawurlencode($state) . '#news', true, 303);
    exit;
}

if (in_array($_SERVER['REQUEST_METHOD'], ['GET', 'POST'], true) && isset($_GET['action'], $_GET['token'])) {
    $action = (string) $_GET['action'];
    $token = (string) $_GET['token'];
    if (!preg_match('/^[a-f0-9]{64}$/', $token)) {
        newsletter_redirect('invalid');
    }

    $subscribers = gaeks_subscribers();
    foreach ($subscribers as &$subscriber) {
        if ($action === 'confirm' && hash_equals((string) ($subscriber['confirmToken'] ?? ''), $token)) {
            $subscriber['status'] = 'active';
            $subscriber['confirmedAt'] = gmdate('c');
            unset($subscriber['confirmToken']);
            gaeks_save_subscribers($subscribers);
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                gaeks_json(['status' => 'success', 'message' => 'Email terkonfirmasi.']);
            }
            newsletter_redirect('confirmed');
        }
        if ($action === 'unsubscribe' && hash_equals((string) ($subscriber['unsubscribeToken'] ?? ''), $token)) {
            $subscriber['status'] = 'unsubscribed';
            $subscriber['unsubscribedAt'] = gmdate('c');
            gaeks_save_subscribers($subscribers);
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                gaeks_json(['status' => 'success', 'message' => 'Langganan dihentikan.']);
            }
            newsletter_redirect('unsubscribed');
        }
    }
    unset($subscriber);
    newsletter_redirect('invalid');
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    gaeks_require_operator();
    $subscribers = array_map('gaeks_public_subscriber', gaeks_subscribers());
    usort($subscribers, static fn(array $a, array $b): int => strcmp($b['subscribedAt'], $a['subscribedAt']));
    gaeks_json([
        'status' => 'success',
        'sender' => GAEKS_NEWS_FROM,
        'mailAvailable' => function_exists('mail'),
        'subscribers' => $subscribers,
    ]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = gaeks_read_json_body();

    if (!empty($body['company'])) {
        gaeks_json(['status' => 'success', 'message' => 'Periksa email untuk menyelesaikan pendaftaran.']);
    }
    if (($body['consent'] ?? false) !== true) {
        gaeks_json(['status' => 'error', 'message' => 'Persetujuan diperlukan.'], 422);
    }

    $email = strtolower(trim((string) ($body['email'] ?? '')));
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
        gaeks_json(['status' => 'error', 'message' => 'Alamat email tidak valid.'], 422);
    }

    $ratePath = gaeks_private_dir() . '/newsletter_rate.json';
    $rate = gaeks_read_json_file($ratePath, []);
    $rateKey = hash('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    $recent = array_values(array_filter($rate[$rateKey] ?? [], static fn($stamp): bool => (int) $stamp > time() - 3600));
    if (count($recent) >= 8) {
        gaeks_json(['status' => 'error', 'message' => 'Terlalu banyak permintaan. Coba kembali nanti.'], 429);
    }
    $recent[] = time();
    $rate[$rateKey] = $recent;
    gaeks_write_json_file($ratePath, $rate);

    $subscribers = gaeks_subscribers();
    $existingIndex = null;
    foreach ($subscribers as $index => $subscriber) {
        if (strtolower((string) ($subscriber['email'] ?? '')) === $email) {
            $existingIndex = $index;
            if (($subscriber['status'] ?? '') === 'active') {
                gaeks_json(['status' => 'success', 'message' => 'Email sudah aktif menerima pembaruan.']);
            }
            break;
        }
    }

    $confirmToken = bin2hex(random_bytes(32));
    $unsubscribeToken = $existingIndex !== null && !empty($subscribers[$existingIndex]['unsubscribeToken'])
        ? (string) $subscribers[$existingIndex]['unsubscribeToken']
        : bin2hex(random_bytes(32));
    $record = [
        'email' => $email,
        'status' => 'pending',
        'subscribedAt' => gmdate('c'),
        'confirmedAt' => null,
        'unsubscribedAt' => null,
        'confirmToken' => $confirmToken,
        'unsubscribeToken' => $unsubscribeToken,
        'consentSource' => 'gaeks.com/news',
    ];

    if ($existingIndex === null) {
        array_unshift($subscribers, $record);
    } else {
        $subscribers[$existingIndex] = $record;
    }
    if (!gaeks_save_subscribers($subscribers)) {
        gaeks_json(['status' => 'error', 'message' => 'Pendaftaran belum dapat disimpan.'], 503);
    }

    $confirmUrl = gaeks_token_url('confirm', $confirmToken);
    $html = gaeks_newsletter_template(
        'Konfirmasi langganan',
        'Selesaikan pendaftaran newsletter GAEKS',
        'Klik tombol di bawah untuk menerima pembaruan berita freight, kepabeanan, dan rute pengiriman.',
        'Konfirmasi email',
        $confirmUrl
    );
    if (!gaeks_send_html_mail($email, 'Konfirmasi newsletter GAEKS', $html)) {
        gaeks_json(['status' => 'error', 'message' => 'Email konfirmasi belum dapat dikirim. Coba kembali nanti.'], 503);
    }

    gaeks_json(['status' => 'success', 'message' => 'Periksa email untuk menyelesaikan pendaftaran.'], 201);
}

gaeks_json(['status' => 'error', 'message' => 'Method not allowed.'], 405);
