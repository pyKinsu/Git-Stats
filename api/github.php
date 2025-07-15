<?php
// Enable CORS if needed
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Get the username from the query string
$username = $_GET['username'] ?? null;

if (!$username) {
    echo json_encode(["error" => "Username is required"]);
    exit;
}

// GitHub API URL
$url = "https://api.github.com/users/" . urlencode($username);

// Setup curl
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// GitHub API requires a User-Agent header
curl_setopt($ch, CURLOPT_USERAGENT, "GitHubStatsViewer");

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Return result
if ($httpcode == 200) {
    echo $response;
} else {
    echo json_encode(["error" => "GitHub API error", "status" => $httpcode]);
}
?>
