document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect profile data
    const profileName = document.getElementById('profile-name').value;
    const profileAge = document.getElementById('profile-age').value;
    const profileEmail = document.getElementById('profile-email').value;

    // Create profile object
    const profile = {
        name: profileName,
        age: profileAge,
        email: profileEmail
    };

    // Get existing profiles from local storage
    let profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    // Limit profiles to 5
    if (profiles.length >= 5) {
        alert('Profile limit reached! You can only create up to 5 profiles.');
        return;
    }

    // Add the new profile to the array and save to local storage
    profiles.push(profile);
    localStorage.setItem('profiles', JSON.stringify(profiles));

    // Redirect back to the main page
    window.location.href = 'home.html';
});
