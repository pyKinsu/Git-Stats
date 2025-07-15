<?php
header('Content-Type: application/json');

if (!isset($_GET['username'])) {
  echo json_encode(['error' => 'Username required']);
  exit;
}

$username = htmlspecialchars($_GET['username']);
$url = "https://api.github.com/users/$username";

// Set User-Agent or GitHub API will block it
$options = [
  'http' => [
    'header' => "User-Agent: PHP\r\n"
  ]
];
$context = stream_context_create($options);
$response = @file_get_contents($url, false, $context);

if ($response === false) {
  echo json_encode(['error' => 'User not found']);
} else {
  echo $response;
}
