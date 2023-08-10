<?php

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$name = htmlspecialchars($_POST['name'], ENT_QUOTES); 
$email= htmlspecialchars($_POST['email'], ENT_QUOTES);
$msg= htmlspecialchars($_POST['message'], ENT_QUOTES);

$token = "5912106310:AAGKcxg_iHxfymcVhgUskRYYS-nG_PrTqM8";
$chat_id = "523186785"; // 523186785
$arr = array(
  'Імя користувача: ' => $name,
  'Електронна пошта: ' => $email,
  'Повідомлення:' => $msg,
);
$txt="";
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

// if ($sendToTelegram) {
//   header('Location: success.html');
// } else {
//   echo "Error";
// }





// Формирование самого письма
$title = "Портфоліо";
$body = "
<h2>Нове повідомлення</h2>
<b>Імя:</b> $name<br>
<b>Email:</b> $email<br>
<b>Message:</b>$msg
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'smarthomeopen1@gmail.com'; // Логин на почте smartkiddo@testove-zavdanya758.online smarthomeopen1@gmail.com
    $mail->Password   = 'hkwokuzlksadpvfb'; // Пароль на почте  j6KdUYYa524W2ff  hkwokuzlksadpvfb
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('smarthomeopen1@gmail.com', 'Портфоліо'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('andriy.atamanchuk99@gmail.com'); 
    $mail->addAddress('rokbender@gmail.com');  



// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {
    $result = "success";
    $status = "200";
} 
else {
    $result = "error";
    $status = "400";
}

} catch (Exception $e) {
    $result = "error";
    $status = "{$mail->ErrorInfo}";
}

echo json_encode(["result" => $result,"status"=>$status]);
?>