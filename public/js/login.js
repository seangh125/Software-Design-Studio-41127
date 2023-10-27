document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginbtn');
  
  loginBtn.addEventListener('click', () => {
      const email = document.getElementById('email-input').value; 
      const password = document.getElementById('password-input').value;
      const rememberMe = document.getElementById('rememberMe').checked;

      fetch('/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, rememberMe }), 
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              window.location.href = '/homepagev2'; 
          } else {
              alert('Login failed. Please check your credentials.');
          }
      })
      .catch(error => {
          console.error('Login request failed:', error);
      });
  });
});
