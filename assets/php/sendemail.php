<?php
header('Content-Type: application/json');

// SendGrid API Key
$sendgrid_apikey = '78PWfB_eT_uOulfCXtoETw';


// Validate required fields
$required_fields = ['name', 'email', 'subject', 'message'];
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit;
    }
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags($_POST['name']), ENT_QUOTES, 'UTF-8');
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(strip_tags($_POST['subject']), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(strip_tags($_POST['message']), ENT_QUOTES, 'UTF-8');

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Build HTML message
$html_content = "
<h2>Contact via website</h2>
<p><strong>Name:</strong> {$name}</p>
<p><strong>Email:</strong> <a href=\"mailto:{$email}\">{$email}</a></p>
<p><strong>Subject:</strong> {$subject}</p>
<p><strong>Message:</strong></p>
<p>{$message}</p>
";

$plain_content = "Contact via website\n\nName: {$name}\nEmail: {$email}\nSubject: {$subject}\nMessage: {$message}";

// SendGrid v3 API payload
$data = [
    'personalizations' => [
        [
            'to' => [
                ['email' => 'globo.rodrigues@gmail.com', 'name' => 'Guilherme Rodrigues']
            ],
            'subject' => "Website Contact: {$subject}"
        ]
    ],
    'from' => [
        'email' => 'contact@gui-ux.com',
        'name' => 'GUI-UX Website'
    ],
    'reply_to' => [
        'email' => $email,
        'name' => $name
    ],
    'content' => [
        ['type' => 'text/plain', 'value' => $plain_content],
        ['type' => 'text/html', 'value' => $html_content]
    ]
];

// SendGrid v3 API request
$ch = curl_init('https://api.sendgrid.com/v3/mail/send');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $sendgrid_apikey,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// Check response
if ($curl_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
    exit;
}

// SendGrid returns 202 for successful send
if ($http_code === 202) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>
