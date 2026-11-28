<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

function gaeks_inquiries_file(): string
{
    return gaeks_private_dir() . '/inquiries.json';
}

function gaeks_read_inquiries(): array
{
    $rows = gaeks_read_json_file(gaeks_inquiries_file(), []);
    return is_array($rows) ? array_values($rows) : [];
}

function gaeks_save_inquiries(array $rows): bool
{
    $ok = gaeks_write_json_file(gaeks_inquiries_file(), array_values($rows));
    if ($ok) {
        @chmod(gaeks_inquiries_file(), 0600);
    }
    return $ok;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    gaeks_require_permission('newsletter.read');
    $inquiries = gaeks_read_inquiries();
    usort($inquiries, static fn(array $a, array $b): int => strcmp((string) ($b['createdAt'] ?? ''), (string) ($a['createdAt'] ?? '')));
    gaeks_json(['status' => 'success', 'inquiries' => $inquiries]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = gaeks_read_json_body();
    if (!empty($body['_hp'])) {
        gaeks_json(['status' => 'success', 'recorded' => false]);
    }

    if (!gaeks_local_demo()) {
        $ratePath = gaeks_private_dir() . '/inquiries_rate.json';
        $rate = gaeks_read_json_file($ratePath, []);
        $rateKey = hash('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
        $recent = array_values(array_filter($rate[$rateKey] ?? [], static fn($stamp): bool => (int) $stamp > time() - 3600));
        if (count($recent) >= 20) {
            gaeks_json(['status' => 'error', 'message' => 'Terlalu banyak permintaan. Coba kembali nanti.'], 429);
        }
        $recent[] = time();
        $rate[$rateKey] = $recent;
        gaeks_write_json_file($ratePath, $rate);
    }

    $clean = static function (string $value, int $limit): string {
        $text = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/u', ' ', $value) ?? '');
        return function_exists('mb_substr') ? mb_substr($text, 0, $limit) : substr($text, 0, $limit);
    };
    $company = $clean((string) ($body['company'] ?? ''), 160);
    $picName = $clean((string) ($body['picName'] ?? ''), 120);
    $picPhone = $clean((string) ($body['picPhone'] ?? ''), 60);
    $picEmail = $clean((string) ($body['picEmail'] ?? ''), 160);
    $picContact = $clean((string) ($body['picContact'] ?? ''), 160);
    if ($picContact === '') {
        $picContact = implode(' · ', array_values(array_filter([$picPhone, $picEmail])));
    }
    $description = $clean((string) ($body['description'] ?? ''), 2000);
    $routedTeam = $clean((string) ($body['routedTeam'] ?? ''), 120);
    $routedGroupId = $clean((string) ($body['routedGroupId'] ?? ''), 60);
    $routingReason = $clean((string) ($body['routingReason'] ?? ''), 240);
    $channel = in_array(($body['channel'] ?? ''), ['whatsapp', 'email', 'form'], true) ? (string) $body['channel'] : 'whatsapp';
    $sourcePath = $clean((string) ($body['sourcePath'] ?? '/kontak/'), 180);

    $rawServices = is_array($body['services'] ?? null) ? $body['services'] : [];
    $services = [];
    foreach (array_slice($rawServices, 0, 12) as $srv) {
        $label = $clean((string) $srv, 100);
        if ($label !== '') {
            $services[] = $label;
        }
    }

    if ($company === '' && $picName === '' && $picPhone === '' && $picEmail === '' && $picContact === '' && $description === '' && empty($services)) {
        gaeks_json(['status' => 'success', 'recorded' => false, 'message' => 'Tidak ada detail untuk dicatat.']);
    }

    $entry = [
        'id' => 'inq-' . bin2hex(random_bytes(6)),
        'createdAt' => gmdate('c'),
        'status' => 'new',
        'company' => $company,
        'picName' => $picName,
        'picPhone' => $picPhone,
        'picEmail' => $picEmail,
        'picContact' => $picContact,
        'services' => $services,
        'description' => $description,
        'routedGroupId' => $routedGroupId,
        'routedTeam' => $routedTeam,
        'routingReason' => $routingReason,
        'channel' => $channel,
        'sourcePath' => $sourcePath,
    ];

    $inquiries = gaeks_read_inquiries();
    array_unshift($inquiries, $entry);
    if (count($inquiries) > 1000) {
        $inquiries = array_slice($inquiries, 0, 1000);
    }
    if (!gaeks_save_inquiries($inquiries)) {
        gaeks_json(['status' => 'error', 'message' => 'Permintaan belum dapat disimpan di server.'], 500);
    }

    gaeks_json(['status' => 'success', 'recorded' => true, 'inquiry' => $entry], 201);
}

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    gaeks_require_permission('newsletter.read', true);
    $body = gaeks_read_json_body();
    $id = trim((string) ($body['id'] ?? ''));
    $status = trim((string) ($body['status'] ?? ''));
    if ($id === '' || !in_array($status, ['new', 'contacted', 'quoted', 'closed'], true)) {
        gaeks_json(['status' => 'error', 'message' => 'Data status tidak valid.'], 422);
    }
    $inquiries = gaeks_read_inquiries();
    $found = false;
    foreach ($inquiries as &$item) {
        if (($item['id'] ?? '') === $id) {
            $item['status'] = $status;
            $item['updatedAt'] = gmdate('c');
            $found = true;
            break;
        }
    }
    unset($item);
    if (!$found) {
        gaeks_json(['status' => 'error', 'message' => 'Data permintaan tidak ditemukan.'], 404);
    }
    gaeks_save_inquiries($inquiries);
    gaeks_json(['status' => 'success']);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    gaeks_require_permission('newsletter.read', true);
    $body = gaeks_read_json_body();
    $id = trim((string) ($body['id'] ?? ''));
    if ($id === '') {
        gaeks_json(['status' => 'error', 'message' => 'ID permintaan diperlukan.'], 422);
    }
    $inquiries = gaeks_read_inquiries();
    $filtered = array_values(array_filter($inquiries, static fn(array $item): bool => ($item['id'] ?? '') !== $id));
    gaeks_save_inquiries($filtered);
    gaeks_json(['status' => 'success']);
}

gaeks_json(['status' => 'error', 'message' => 'Metode tidak diizinkan.'], 405);
