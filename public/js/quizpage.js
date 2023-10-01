document.addEventListener("DOMContentLoaded", function () {
    let currentQuestionIndex = 0; 

    let currentDifficulty = "easy"; 
    const maxCorrectStreak = 2; 
    const maxLoseStreak = 2;

    let correctAnswer = null; 
    let selectedAnswer = null; 


    let currentStreak = 0;


    const questions = [
        {
            questionNumber: 1,
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: "4",
            difficulty: "easy",
        },
        {
            questionNumber: 2,
            question: "What is 3 x 3?",
            options: ["6", "9", "12", "15"],
            correctAnswer: "9",
            difficulty: "easy",
        },

        {
            questionNumber: 3,
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "London"],
            correctAnswer: "Paris",
            difficulty: "medium",
        },
        {
            questionNumber: 4,
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
            correctAnswer: "William Shakespeare",
            difficulty: "medium",
        },

        {
            questionNumber: 5,
            question: "What is the square root of 144?",
            options: ["9", "12", "10", "14"],
            correctAnswer: "12",
            difficulty: "hard",
        },
        {
            questionNumber: 6,
            question: "In which year did World War II end?",
            options: ["1945", "1918", "1955", "1939"],
            correctAnswer: "1945",
            difficulty: "hard",
        },
    ];

    const streaksByDifficulty = {
        easy: {
            consecutiveRightAnswers: 0,
            consecutiveWrongAnswers: 0,
        },
        medium: {
            consecutiveRightAnswers: 0,
            consecutiveWrongAnswers: 0,
        },
        hard: {
            consecutiveRightAnswers: 0,
            consecutiveWrongAnswers: 0,
        },
    };

    const totalAnswers = {
        easy: {
            rightAnswers: 0,
            wrongAnswers: 0,
        },
        medium: {
            rightAnswers: 0,
            wrongAnswers: 0,
        },
        hard: {
            rightAnswers: 0,
            wrongAnswers: 0,
        },
    };


    const nextButton = document.querySelector(".next-button");

    function loadQuestion(index) {
        let availableQuestions = questions.filter(question => question.difficulty === currentDifficulty);

        // If no available questions of the current difficulty, switch to an easier difficulty
        if (availableQuestions.length === 0) {
            if (currentDifficulty === "medium") {
                currentDifficulty = "easy";
            } else if (currentDifficulty === "hard") {
                currentDifficulty = "medium";
            }
            availableQuestions = questions.filter(question => question.difficulty === currentDifficulty);
        }

        // Randomly select a question from the available ones
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const questionData = availableQuestions[randomIndex];

        const questionNumber = document.getElementById("questionNumber");
        const questionText = document.getElementById("questionText");
        const option1Text = document.getElementById("option1Text");
        const option2Text = document.getElementById("option2Text");
        const option3Text = document.getElementById("option3Text");
        const option4Text = document.getElementById("option4Text");
        const currentQuestion = document.getElementById("currentQuestion");

        questionNumber.textContent = index + 1;
        currentQuestion.textContent = index +1 ;


        questionText.textContent = questionData.question;
        option1Text.textContent = questionData.options[0];
        option2Text.textContent = questionData.options[1];
        option3Text.textContent = questionData.options[2];
        option4Text.textContent = questionData.options[3];

    const radioButtons = document.querySelectorAll('input[name="q"]');
    radioButtons[0].value = questionData.options[0];
    radioButtons[1].value = questionData.options[1];
    radioButtons[2].value = questionData.options[2];
    radioButtons[3].value = questionData.options[3];

    radioButtons.forEach(function (radioButton) {
        radioButton.checked = false;
    });


        correctAnswer = questionData.correctAnswer;
        return correctAnswer;
    }

    // Load the first question when the page loads
    correctAnswer = loadQuestion(currentQuestionIndex);

    // When next button is clicked, check the selected answer
    nextButton.addEventListener("click", function () {

        const radioButtons = document.querySelectorAll('input[name="q"]');
        selectedAnswer = null;

        radioButtons.forEach(function (radioButton) {
            if (radioButton.checked) {
                selectedAnswer = radioButton.value;
            }
        });
        console.log("Selected answer:", selectedAnswer);
        console.log("Correct answer:", correctAnswer);
        

        const resultMessage = document.getElementById("resultMessage");
        const resultModal = document.getElementById("resultModal");
        const currentStreakDisplay = document.getElementById("currentStreak");
        const resultIcon = document.getElementById("resultIcon");

        if (selectedAnswer) {
            if (selectedAnswer === correctAnswer) {
                streaksByDifficulty[currentDifficulty].consecutiveRightAnswers++;
                console.log(streaksByDifficulty[currentDifficulty].consecutiveRightAnswers);
                streaksByDifficulty[currentDifficulty].consecutiveWrongAnswers = 0;

                totalAnswers[currentDifficulty].rightAnswers++;


                currentStreak++;
                resultMessage.textContent = "Correct!";
                resultIcon.src = "public/img/check.png";
            } else {
                streaksByDifficulty[currentDifficulty].consecutiveWrongAnswers++;
                streaksByDifficulty[currentDifficulty].consecutiveRightAnswers = 0;

                totalAnswers[currentDifficulty].wrongAnswers++;

                currentStreak = 0;
                resultMessage.textContent = "Wrong.";
                resultIcon.src = "public/img/cross.png";
            }
            // If 6 questions are right, or 6 questions are wrong in a level then end the test as the tester belongs to that level
            console.log("Total: " + totalAnswers[currentDifficulty].rightAnswers + " " + currentDifficulty);
            if (totalAnswers[currentDifficulty].rightAnswers === 6 || totalAnswers[currentDifficulty].wrongAnswers === 6) {
                alert("Test completed! User belongs to " + currentDifficulty + " level.");
            }
      

            currentStreakDisplay.textContent = currentStreak;

            if (streaksByDifficulty[currentDifficulty].consecutiveRightAnswers >= maxCorrectStreak) {
                // If 3 questions are right in a row then switch to harder difficulty
                streaksByDifficulty[currentDifficulty].consecutiveRightAnswers = 0; 
                if (currentDifficulty === "easy") {
                    currentDifficulty = "medium";
                } else if (currentDifficulty === "medium") {
                    currentDifficulty = "hard";
                }
            }

            if (streaksByDifficulty[currentDifficulty].consecutiveWrongAnswers >= maxLoseStreak) {
                     // If 3 questions are wrong in a row then switch to harder difficulty
                     streaksByDifficulty[currentDifficulty].consecutiveWrongAnswers = 0; 
                if (currentDifficulty === "medium") {
                    currentDifficulty = "easy";
                } else if (currentDifficulty === "hard") {
                    currentDifficulty = "medium";
                }
            }
    
        
                // Show modal
                resultModal.classList.add("show");
                resultModal.style.display = "block";
                currentQuestionIndex++;

                const nextQuestionButton = document.querySelector(".next-question-button");

                nextQuestionButton.addEventListener("click", function () {
                    resultModal.classList.remove("show");
                    resultModal.style.display = "none";
                    if (currentQuestionIndex != 24) {
                        loadQuestion(currentQuestionIndex);
                    } else {
                        // Code for when quiz is completed
                        alert("Quiz completed!"); 
                    }
                });
            
        } else {
            alert("Please select an answer");
        }
    });
});