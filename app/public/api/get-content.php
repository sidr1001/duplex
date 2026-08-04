<?php
header('Content-Type: application/json; charset=utf-8');

$storageFile = dirname(__DIR__) . '/storage/site-content.json';

if (!file_exists($storageFile)) {
  echo json_encode(['content' => null]);
  exit;
}

$raw = file_get_contents($storageFile);
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(500);
  echo json_encode(['error' => 'invalid_stored_json']);
  exit;
}

echo json_encode(['content' => $data]);
