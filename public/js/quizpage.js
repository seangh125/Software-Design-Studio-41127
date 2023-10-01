document.addEventListener("DOMContentLoaded", function () {
    let correctAnswer = "yellow";
    let correctStreak = 0; 
    const nextButton = document.querySelector(".next-button");
    // When next button is clicked get the value corresponding to the radio button to selected answer
    nextButton.addEventListener("click", function () {
        const radioButtons = document.querySelectorAll('input[name="q"]');
        let selectedAnswer = null;

        radioButtons.forEach(function (radioButton) {
            if (radioButton.checked) {
                selectedAnswer = radioButton.value;
            }
        });
        // Get elements and put them into variables
        const resultMessage = document.getElementById("resultMessage");
        const resultModal = document.getElementById("resultModal");
        const correctStreakDisplay = document.getElementById("correctStreak");
        const resultIcon = document.getElementById("resultIcon");
        const streakImage = document.querySelector(".streak-icon");

        // If an answer is selected
        if (selectedAnswer) {
            if (selectedAnswer === correctAnswer) {
                correctStreak++;
                resultMessage.textContent = "Correct!";
                resultIcon.src = "public/img/check.png";
            } else {
                correctStreak = 0;
                resultMessage.textContent = "Wrong.";
                resultIcon.src = "public/img/cross.png";
            }

            correctStreakDisplay.textContent = correctStreak;
            // Hide streak image if streak is 0
            if (correctStreak == 0) {
                streakImage.style.display = "none"; 
            } else {
                streakImage.style.display = "inline"
            }
            // Show the modal 
            resultModal.classList.add("show");
            resultModal.style.display = "block";
            // Attach click event handler
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