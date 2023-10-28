document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    
    loginButton.addEventListener('click', function(event) {
    
    });
});

document.addEventListener('DOMContentLoaded', () =>{
    const startQuizButton = document.getElementById('startQuizBtn');
    startQuizButton.addEventListener('click', function(event) {
        window.location.href = "/quizpage";
    });
});

