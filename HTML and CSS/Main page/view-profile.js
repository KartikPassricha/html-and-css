window.onload = function() {
    // Retrieve the selected profile from local storage
    const selectedProfile = JSON.parse(localStorage.getItem('selectedProfile'));

    if (selectedProfile) {
        // Populate the profile details on the page
        const profileDetailsDiv = document.getElementById('profile-details');
        profileDetailsDiv.innerHTML = `
            <p><strong>Name:</strong> ${selectedProfile.name}</p>
            <p><strong>Age:</strong> ${selectedProfile.age}</p>
            <p><strong>Email:</strong> ${selectedProfile.email}</p>
        `;
    } else {
        // If no profile data is found, display an error message
        document.getElementById('profile-details').innerHTML = '<p>No profile data found.</p>';
    }
};

function goBack() {
    // Redirect back to the main profiles page
    window.location.href = 'home.html';
}
