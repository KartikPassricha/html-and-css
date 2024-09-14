document.getElementById('create-profile-button').addEventListener('click', () => {
    // Redirect to the profile creation page
    window.location.href = 'create-profile.html';
});

// Load and display profiles from local storage
window.onload = function() {
    loadProfiles();
};

function loadProfiles() {
    const profileList = document.getElementById('profile-list');
    profileList.innerHTML = ''; // Clear current list

    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    profiles.forEach((profile, index) => {
        const li = document.createElement('li');
        li.textContent = profile.name;

        // Create action buttons for each profile
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('profile-actions');

        // "Use Profile" button
        const useButton = document.createElement('button');
        useButton.textContent = 'Use Profile';
        useButton.addEventListener('click', () => useProfile(index));
        actionsDiv.appendChild(useButton);

        // "Delete Profile" button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Profile';
        deleteButton.addEventListener('click', () => deleteProfile(index));
        actionsDiv.appendChild(deleteButton);

        // Append action buttons to the list item
        li.appendChild(actionsDiv);
        profileList.appendChild(li);
    });
}

function useProfile(index) {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    const selectedProfile = profiles[index];

    // Store the selected profile in local storage for use on the next page
    localStorage.setItem('selectedProfile', JSON.stringify(selectedProfile));

    // Redirect to view-profile.html
    window.location.href = 'view-profile.html';
}

function deleteProfile(index) {
    let profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    // Confirm before deleting
    if (confirm(`Are you sure you want to delete the profile: ${profiles[index].name}?`)) {
        // Remove the profile from the array
        profiles.splice(index, 1);

        // Save the updated profiles array to local storage
        localStorage.setItem('profiles', JSON.stringify(profiles));

        // Update the profile list display
        loadProfiles();
    }
}
