<?php
// send.php
// Receives POST from contact form and sends email to the configured address.
// Recommended: install PHPMailer via Composer to use SMTP (more reliable). Fallback uses mail().

$to = 'vivianavasilescu415@yahoo.com'; // destination address (as requested)

$name = isset($_POST['name']) ? trim($_POST['name']) : ''; 
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if(!$name || !$email || !$message){
  header('Location: /?sent=0');
  exit;
}

// Prefer PHPMailer via Composer autoload
$autoload = __DIR__ . '/vendor/autoload.php';
if(file_exists($autoload)){
  require $autoload;
  try{
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    // SMTP configuration - fill these with real credentials
    $mail->isSMTP();
    $mail->Host = 'smtp.mail.yahoo.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'vivianavasilescu415@yahoo.com'; // your Yahoo email
    $mail->Password = 'YOUR_SMTP_PASSWORD'; // <-- REPLACE with app password
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS; // 'ssl'
    $mail->Port = 465;

    $mail->setFrom($email, $name);
    $mail->addAddress($to);
    $mail->Subject = "Mesaj site: {$name}";
    $body = "Nume: {$name}\nEmail: {$email}\n\n{$message}";
    $mail->Body = $body;

    $mail->send();
    header('Location: /?sent=1');
    exit;
  }catch(Exception $e){
    // Log $e->getMessage() somewhere if needed
    header('Location: /?sent=0');
    exit;
  }
} else {
  // Fallback: native mail() — often doesn't work on local XAMPP without SMTP relay
  $subject = "Mesaj site: {$name}";
  $headers = "From: {$name} <{$email}>\r\nReply-To: {$email}\r\n";
  $body = "Nume: {$name}\nEmail: {$email}\n\n{$message}";
  if(mail($to, $subject, $body, $headers)){
    header('Location: /?sent=1');
    exit;
  } else {
    header('Location: /?sent=0');
    exit;
  }
}

?>