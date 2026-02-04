<?php 
 
 $url = 'https://api.sendgrid.com/';
 $user = 'azure_a4bd5355e3769c604df1708d2096f2ee@azure.com';
 $pass = 'PNBYGLSJSlX2g57'; 
 $sendgrid_apikey = getenv('78PWfB_eT_uOulfCXtoETw');

 $message = "<h1>Contact via website</h1><p>Name:".$_POST['name'].'<br/>Email: <a href=\"mailto:'.$_POST['email'].'\">'.$_POST['email'].'</a><br/>Message: '.$_POST['message'].'</p>';
 $subject = $_POST['subject'];
 
 $params = array(
      'api_user' => $user,
      'api_key' => $pass,
      'to' => 'contact@gui-ux.com',
      'subject' => $subject,
      'html' => $message,
      'text' => 'TEXT',
      'from' => $_POST['email'],
   );

//  $request = $url.'api/mail.send.json';

//  // Generate curl request
//  $session = curl_init($request);

//  // Tell curl to use HTTP POST
//  curl_setopt ($session, CURLOPT_POST, true);

//  // Tell curl that this is the body of the POST
//  curl_setopt ($session, CURLOPT_POSTFIELDS, $params);

//  // Tell curl not to return headers, but do return the response
//  curl_setopt($session, CURLOPT_HEADER, false);
//  curl_setopt($session, CURLOPT_HTTPHEADER, array('Authorization: Bearer ' . $sendgrid_apikey));
//  curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

//  // obtain response
//  $response = curl_exec($session);
//  curl_close($session);

//  // print everything out
// // print_r($response);


 $request = $url.'api/mail.send.json';

 // Generate curl request
 $session = curl_init($request);
 curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);

 // Tell curl to use HTTP POST
 curl_setopt ($session, CURLOPT_POST, true);

 // Tell curl that this is the body of the POST
 curl_setopt ($session, CURLOPT_POSTFIELDS, $params);

 // Tell curl not to return headers, but do return the response
 curl_setopt($session, CURLOPT_HEADER, false);
 curl_setopt($session, CURLOPT_HTTPHEADER, array('Authorization: Bearer ' . $sendgrid_apikey));
 curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

 // obtain response
 $response = curl_exec($session);
 curl_close($session);

 // print everything out
// print_r($response);
 print_r($response);

echo "Thanks for your message. \n I'll get back to you shortly." ;
echo "Thanks for your message. \n I'll get back to you shortly.".$response;
?>