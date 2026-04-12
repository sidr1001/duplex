<?php
header('Content-Type: application/json; charset=utf-8');

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
$content = $payload['content'] ?? null;

if (!is_array($content)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'invalid_content_payload']);
  exit;
}

$storageDir = dirname(__DIR__) . '/storage';
$storageFile = $storageDir . '/site-content.json';

if (!is_dir($storageDir)) {
  mkdir($storageDir, 0775, true);
}

$encoded = json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
if ($encoded === false) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'json_encode_failed']);
  exit;
}

$result = file_put_contents($storageFile, $encoded, LOCK_EX);

if ($result === false) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'write_failed']);
  exit;
}

echo json_encode(['ok' => true]);
