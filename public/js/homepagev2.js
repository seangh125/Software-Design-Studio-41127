document.addEventListener('DOMContentLoaded', () =>{
    const startQuizButton = document.getElementById('startQuizBtn');
    startQuizButton.addEventListener('click', function(event) {
        window.location.href = "/quizpage";
    });
});

