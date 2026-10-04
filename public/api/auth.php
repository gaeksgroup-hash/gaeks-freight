<?php
declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    gaeks_start_session();
    $user = !empty($_SESSION['operator_authenticated']) ? gaeks_session_user() : null;
    $authenticated = $user !== null;
    gaeks_json([
        'status' => 'success',
        'authenticated' => $authenticated,
        'csrfToken' => $authenticated ? gaeks_csrf_token() : null,
        'user' => $user,
    ]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    gaeks_start_session();
    $attempts = (int) ($_SESSION['login_attempts'] ?? 0);
    $lockedUntil = (int) ($_SESSION['locked_until'] ?? 0);
    if ($lockedUntil > time()) {
        gaeks_json(['status' => 'error', 'message' => 'Terlalu banyak percobaan. Coba kembali beberapa menit lagi.'], 429);
    }

    $body = gaeks_read_json_body();
    $operator = gaeks_operator_credentials((string) ($body['username'] ?? ''), (string) ($body['password'] ?? ''));
    if ($operator === null) {
        $attempts++;
        $_SESSION['login_attempts'] = $attempts;
        if ($attempts >= 6) {
            $_SESSION['locked_until'] = time() + 600;
            $_SESSION['login_attempts'] = 0;
        }
        usleep(350000);
        gaeks_json(['status' => 'error', 'message' => 'Username atau kata sandi tidak valid.'], 401);
    }

    session_regenerate_id(true);
    $_SESSION['operator_authenticated'] = true;
    $_SESSION['operator_user'] = $operator;
    $_SESSION['login_attempts'] = 0;
    $_SESSION['csrf'] = bin2hex(random_bytes(24));
    $operator['permissions'] = gaeks_role_permissions((string) $operator['role']);
    gaeks_json(['status' => 'success', 'authenticated' => true, 'csrfToken' => $_SESSION['csrf'], 'user' => $operator]);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    gaeks_require_operator(true);
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }
    session_destroy();
    gaeks_json(['status' => 'success']);
}

gaeks_json(['status' => 'error', 'message' => 'Method not allowed.'], 405);
