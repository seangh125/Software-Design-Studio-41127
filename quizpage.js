document.addEventListener("DOMContentLoaded", function () {
    let correctAnswer = "yellow";
    let correctStreak = 0; 

    const nextButton = document.querySelector(".next-button");
    nextButton.addEventListener("click", function () {
        const radioButtons = document.querySelectorAll('input[name="q"]');
        let selectedAnswer = null;

        radioButtons.forEach(function (radioButton) {
            if (radioButton.checked) {
                selectedAnswer = radioButton.value;
            }
        });

        const resultMessage = document.getElementById("resultMessage");
        const resultModal = document.getElementById("resultModal");
        const correctStreakDisplay = document.getElementById("correctStreak");
        if (selectedAnswer) {
            if (selectedAnswer === correctAnswer) {
                correctStreak++;
                resultMessage.textContent = "Correct!";
            } else {
                correctStreak = 0;
                resultMessage.textContent = "Wrong, Better luck next time!";
            }

            correctStreakDisplay.textContent = correctStreak;

            resultModal.classList.add("show");
            resultModal.style.display = "block";

            const nextQuestionButton = document.querySelector(".next-question-button");
            nextQuestionButton.addEventListener("click", function () {
                resultModal.classList.remove("show");
                resultModal.style.display = "none";
                // Logic to get to the new question can be added here
   
            });
        } else { // Else nothing is selected

            alert("Please select an answer");
        }
    });
});