<?php
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'invalid_json']);
  exit;
}

$name = trim($data['name'] ?? '-');
$phone = trim($data['phone'] ?? '');
$email = trim($data['email'] ?? '-');
$recipient = trim($data['recipientEmail'] ?? '');

if ($recipient === '' || $phone === '') {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'recipient_and_phone_required']);
  exit;
}

$smtpHost = getenv('SMTP_HOST') ?: 'smtp.yandex.ru';
$smtpPort = (int)(getenv('SMTP_PORT') ?: 465);
$smtpSecure = strtolower((string)(getenv('SMTP_SECURE') ?: 'true')) === 'true';
$smtpUser = getenv('SMTP_USER') ?: '';
$smtpPass = getenv('SMTP_PASS') ?: '';

if ($smtpUser === '' || $smtpPass === '') {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'smtp_credentials_missing']);
  exit;
}

$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host = $smtpHost;
  $mail->SMTPAuth = true;
  $mail->Username = $smtpUser;
  $mail->Password = $smtpPass;
  $mail->SMTPSecure = $smtpSecure ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = $smtpPort;
  $mail->CharSet = 'UTF-8';

  $mail->setFrom($smtpUser, 'Сайт');
  $mail->addAddress($recipient);
  $mail->Subject = 'Новая заявка с лендинга';
  $mail->isHTML(false);
  $mail->Body = "Имя: {$name}\nТелефон: {$phone}\nEmail: {$email}\nИсточник: сайт";

  $mail->send();
  echo json_encode(['success' => true]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
}
