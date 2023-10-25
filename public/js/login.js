document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginbtn');
    
    loginButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
     
    if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
      alert('please enter username and password!');
    } else { 
      window.location.href = 'homepage';
    }
});
});