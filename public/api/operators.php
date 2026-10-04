<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

function gaeks_public_operator(array $operator): array
{
    return [
        'username' => (string) ($operator['username'] ?? ''),
        'displayName' => (string) ($operator['displayName'] ?? ''),
        'role' => (string) ($operator['role'] ?? ''),
        'active' => (bool) ($operator['active'] ?? false),
        'createdAt' => (string) ($operator['createdAt'] ?? ''),
        'updatedAt' => (string) ($operator['updatedAt'] ?? ''),
    ];
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    gaeks_require_permission('users.manage');
    $operators = [[
        'username' => GAEKS_OPERATOR_USER,
        'displayName' => 'Gaekadmin',
        'role' => 'super_admin',
        'active' => true,
        'createdAt' => '',
        'updatedAt' => '',
    ]];
    foreach (gaeks_operators() as $operator) {
        if (is_array($operator)) {
            $operators[] = gaeks_public_operator($operator);
        }
    }
    gaeks_json(['status' => 'success', 'operators' => $operators]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    gaeks_require_permission('users.manage', true);
    $body = gaeks_read_json_body();
    $username = trim((string) ($body['username'] ?? ''));
    $displayName = trim((string) ($body['displayName'] ?? ''));
    $role = (string) ($body['role'] ?? '');
    $password = (string) ($body['password'] ?? '');
    $active = ($body['active'] ?? true) === true;

    if (!preg_match('/^[A-Za-z][A-Za-z0-9._-]{2,31}$/', $username) || strcasecmp($username, GAEKS_OPERATOR_USER) === 0) {
        gaeks_json(['status' => 'error', 'message' => 'Username harus 3–32 karakter dan belum digunakan.'], 422);
    }
    if ($displayName === '' || strlen($displayName) > 80 || !in_array($role, ['website_admin', 'cms', 'seo'], true)) {
        gaeks_json(['status' => 'error', 'message' => 'Nama atau peran tidak valid.'], 422);
    }

    $operators = gaeks_operators();
    $existingIndex = null;
    foreach ($operators as $index => $operator) {
        if (is_array($operator) && strcasecmp((string) ($operator['username'] ?? ''), $username) === 0) {
            $existingIndex = $index;
            break;
        }
    }
    if ($existingIndex === null && strlen($password) < 12) {
        gaeks_json(['status' => 'error', 'message' => 'Kata sandi baru minimal 12 karakter.'], 422);
    }
    if ($existingIndex !== null && $password !== '' && strlen($password) < 12) {
        gaeks_json(['status' => 'error', 'message' => 'Kata sandi minimal 12 karakter.'], 422);
    }

    $now = gmdate('c');
    $record = $existingIndex === null ? ['createdAt' => $now] : $operators[$existingIndex];
    $record['username'] = $username;
    $record['displayName'] = $displayName;
    $record['role'] = $role;
    $record['active'] = $active;
    $record['updatedAt'] = $now;
    if ($password !== '') {
        $record['passwordHash'] = password_hash($password, PASSWORD_DEFAULT);
    }

    if ($existingIndex === null) {
        $operators[] = $record;
    } else {
        $operators[$existingIndex] = $record;
    }
    if (!gaeks_save_operators($operators)) {
        gaeks_json(['status' => 'error', 'message' => 'Akun operator belum dapat disimpan.'], 500);
    }
    gaeks_json(['status' => 'success', 'message' => 'Akun operator tersimpan.', 'operator' => gaeks_public_operator($record)]);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    gaeks_require_permission('users.manage', true);
    $body = gaeks_read_json_body();
    $username = trim((string) ($body['username'] ?? ''));
    if ($username === '' || strcasecmp($username, GAEKS_OPERATOR_USER) === 0) {
        gaeks_json(['status' => 'error', 'message' => 'Akun utama tidak dapat dihapus.'], 422);
    }
    $operators = array_values(array_filter(gaeks_operators(), static function ($operator) use ($username): bool {
        return !is_array($operator) || strcasecmp((string) ($operator['username'] ?? ''), $username) !== 0;
    }));
    if (!gaeks_save_operators($operators)) {
        gaeks_json(['status' => 'error', 'message' => 'Akun operator belum dapat dihapus.'], 500);
    }
    gaeks_json(['status' => 'success', 'message' => 'Akun operator dihapus.']);
}

gaeks_json(['status' => 'error', 'message' => 'Method not allowed.'], 405);
