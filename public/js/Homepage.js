document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    
    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        
        // Show an alert when the button is clicked
        alert('Log In button clicked!');
    });
});