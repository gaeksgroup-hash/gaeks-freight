<?php
declare(strict_types=1);

require_once __DIR__ . '/_article.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    gaeks_json(['status' => 'error', 'message' => 'Method not allowed.'], 405);
}
$secret = (string) (getenv('GAEKS_NEWSLETTER_CRON_TOKEN') ?: '');
$provided = (string) ($_SERVER['HTTP_X_GAEKS_CRON_TOKEN'] ?? '');
if ($secret === '' || $provided === '' || !hash_equals($secret, $provided)) {
    gaeks_require_permission('newsletter.read', true);
}
$result = gaeks_process_newsletter_queue(25);
gaeks_json(['status' => 'success'] + $result);
