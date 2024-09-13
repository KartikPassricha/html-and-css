function loginUser(event) {
    event.preventDefault(); // Add this line to prevent the form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    if (username === '' || password === '') {
        alert("Please fill in both fields.");
        return false;
    }

    const loginData = {
        username: username,
        password: password
    };

    console.log('loginData:', loginData);

    fetch('LOGIN.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response data:', data);
        if (data.success) {
            alert("Login successful! Redirecting...");
            window.location.href = "dashboard.html"; // Redirect to a dashboard or home page
        } else {
            alert("Login failed: " + data.message);
        }
    })
    .catch(error => console.error('Error:', error));

    return false;
}