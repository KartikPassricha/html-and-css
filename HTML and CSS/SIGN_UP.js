function signupUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Basic form validation
    if (username === '' || password === '' || email === '') {
        alert("Please fill in all fields.");
        return false;
    }

    const signupData = {
        username: username,
        password: password,
        email: email
    };

    // Sending the POST request to the Flask server
    fetch('http://localhost:5500/signup', {  // Update the URL based on the Flask server location
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Signup successful! Redirecting to login page...");
            window.location.href = "login.html";  // Redirect to the login page
        } else {
            alert("Signup failed: " + data.message);
        }
    })
    .catch(error => console.error('Error:', error));

    return false;
}
