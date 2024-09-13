<?php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "#LOWSPECGAMER1234@";
$dbname = "USER_RECORD_DATA";

// Get data from the signup form
$input = json_decode(file_get_contents('php://input'), true);
$user = $input['username'];
$pass = password_hash($input['password'], PASSWORD_DEFAULT);
$email = $input['email'];

// Connect to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Check if username or email already exists
$stmt = $conn->prepare("SELECT * FROM users WHERE username=? OR email=?");
$stmt->bind_param("ss", $user, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Username or email already exists']);
    exit;
}

// Insert new user into the database
$stmt = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $user, $pass, $email);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Signup successful']);
} else {
    echo json_encode(['success' => false, 'message' => 'Signup failed']);
}

$stmt->close();
$conn->close();
?>
