<?php

$token 		= $_GET['token'];
$amount 	= $_GET['fees'];
$server		= 'http://'.$_SERVER['SERVER_NAME'].'/instamojo/redirect.php?token='.$token;
$email 		= $_GET['email'];
$buyer 		= $_GET['name'];
//echo $server;exit;
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://test.instamojo.com/api/1.1/payment-requests/');
curl_setopt($ch, CURLOPT_HEADER, FALSE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($ch, CURLOPT_HTTPHEADER,
            array("X-Api-Key:test_85986fb6f65a18cb69baefceba4",
                  "X-Auth-Token:test_dbb538238712c500631ed336a49"));
$payload = Array(
    'purpose' => 'astroisha consultation',
    'amount' => $amount,
    'phone' => '9727841461',
    'buyer_name' => $buyer,
    'redirect_url' => $server,
    'send_email' => true,
    'webhook' => '',
    'send_sms' => false,
    'email' => $email,
    'allow_repeated_payments' => false
);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));
$response = curl_exec($ch);
curl_close($ch); 

$json 		= json_decode($response, true);
$long_url 	= $json['payment_request']['longurl'];
header('Location:'.$long_url);
?>
