async function getSessionData() {
   try {
     const response = await fetch('/session-data');
     const sessionData = await response.json();
     return sessionData.education;
   } catch (error) {
     console.error('Error fetching session data:', error);
     return null; 
   }
 }

 document.addEventListener('DOMContentLoaded', async () => {
    const sessionIdentifier = Math.random().toString(36).substring(7);
 
    let currentQuestionIndex = 0;
    let currentDifficulty = await getSessionData();
    
    const maxCorrectStreak = 2;
    const maxLoseStreak = 2;
 
    let correctAnswer = null;
    let selectedAnswer = null;
 
 
    let currentStreak = 0;
 
    let timer;
    const timerDisplay = document.getElementById("timer");
 
    function startTimer(duration, display) {
       function updateTimer() {
          const remaining = Math.max(0, duration);
          const minutes = Math.floor(remaining / 60);
          const seconds = remaining % 60;
          display.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
 
          if (remaining > 0) {
             duration--;
             // Update timer every second
             timer = setTimeout(updateTimer, 1000);
          } else {
             // Timer is 0 and ends test and goes to result page
             window.location.href = "/resultspage";
          }
       }
       updateTimer();
    }
 
    // Start timer with 1200 seconds which is 20 minutes
    startTimer(1200, timerDisplay);

    let questions = [];
    fetch('/api/questions')
    .then((response) => response.json())
    .then((data) => {
      questions = data; 
      correctAnswer = loadQuestion(currentQuestionIndex);
    })
    .catch((error) => {
      console.error('Failed to fetch questions:', error);
    });

    const streaksByDifficulty = {
       "Year 10": {
          consecutiveRightAnswers: 0,
          consecutiveWrongAnswers: 0,
       },
       "Year 11": {
          consecutiveRightAnswers: 0,
          consecutiveWrongAnswers: 0,
       },
       "Year 12" : {
          consecutiveRightAnswers: 0,
          consecutiveWrongAnswers: 0,
       },
    };
 
    const totalAnswers = {
      "Year 10": {
          rightAnswers: 0,
          wrongAnswers: 0,
       },
       "Year 11": {
          rightAnswers: 0,
          wrongAnswers: 0,
       },
       "Year 12": {
          rightAnswers: 0,
          wrongAnswers: 0,
       },
    };
 
 
    const submitButton = document.querySelector(".submit-button");
 
    function disableSubmitButton() {
       submitButton.disabled = true;
    }
 
    function enableSubmitButton() {
       submitButton.disabled = false;
    }
    disableSubmitButton();
 
 
    function loadQuestion(index) {
       let availableQuestions = questions.filter(question => question.difficulty === currentDifficulty);
       // If no available questions of the current difficulty, switch to an easier difficulty
       if (availableQuestions.length === 0) {
          if (currentDifficulty === "Year 11") {
             currentDifficulty = "Year 10";
          } else if (currentDifficulty === "Year 12") {
             currentDifficulty = "Year 11";
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
       currentQuestion.textContent = index + 1;
 
 
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
 
    const radioButtons = document.querySelectorAll('input[name="q"]');
   // Add an event listener to each radio button to enable the submit button when checked
    radioButtons.forEach(function (radioButton) {
      radioButton.addEventListener("change", function () {
          if (radioButton.checked) {
              enableSubmitButton();
          } else {
              disableSubmitButton();
          }
      });
  });
 
    // When submit button is clicked, check the selected answer
    submitButton.addEventListener("click", function () {
 
       const radioButtons = document.querySelectorAll('input[name="q"]');
       selectedAnswer = null;
 
       radioButtons.forEach(function (radioButton) {
          if (radioButton.checked) {
             selectedAnswer = radioButton.value;
          }
       });
       
       radioButtons.forEach(function (radioButton) {
         radioButton.disabled = true;
      });


       console.log("Selected answer:", selectedAnswer);
       console.log("Correct answer:", correctAnswer);
 
 
       const resultMessage = document.getElementById("resultMessage");
       const resultModal = document.getElementById("resultModal");
       const currentStreakDisplay = document.getElementById("currentStreak");
       const resultIcon = document.getElementById("resultIcon");
 
       if (selectedAnswer) {
         disableSubmitButton();
          if (selectedAnswer === correctAnswer) {
             streaksByDifficulty[currentDifficulty].consecutiveRightAnswers++;
             console.log(streaksByDifficulty[currentDifficulty].consecutiveRightAnswers);
             streaksByDifficulty[currentDifficulty].consecutiveWrongAnswers = 0;
             totalAnswers[currentDifficulty].rightAnswers++;
 
 
             currentStreak++;
             resultMessage.textContent = "Correct!";
             resultIcon.src = "../public/img/check.png";
          } else {
             streaksByDifficulty[currentDifficulty].consecutiveWrongAnswers++;
             streaksByDifficulty[currentDifficulty].consecutiveRightAnswers = 0;
 
             totalAnswers[currentDifficulty].wrongAnswers++;
 
             currentStreak = 0;
             resultMessage.textContent = "Wrong.";
             resultIcon.src = "../public/img/cross.png";
          }

          // Display streak icon if currentStreak is greater than 0
          if (currentStreak > 0) {
            streakIcon.style.display = "block";
         } else {
            streakIcon.style.display = "none";
         }

          // If 6 questions are right, or 6 questions are wrong in a level then end the test as the tester belongs to that level
          console.log("Total: " + totalAnswers[currentDifficulty].rightAnswers + " " + currentDifficulty);
          if (totalAnswers[currentDifficulty].rightAnswers === 6 || totalAnswers[currentDifficulty].wrongAnswers === 6) {
             alert("Test completed! User belongs to " + currentDifficulty + " level.");
             fetch("/save-Result", {
                   method: "POST",
                   headers: {
                      "Content-Type": "application/json",
                   },
                   body: JSON.stringify({
                      currentDifficulty,
                      sessionIdentifier
                   }),
                })
                .then((response) => response.json())
                .then((data) => {
                   // Handle the response data
                   console.log("Response:", data);
                })
                .catch((error) => {
                   console.error("Error:", error);
                });
             window.location.href = `/resultspage?sessionIdentifier=${sessionIdentifier}`;
          }
 
 
          currentStreakDisplay.textContent = currentStreak;
          // Adapative Mechanism
          if (streaksByDifficulty[currentDifficulty].consecutiveRightAnswers >= maxCorrectStreak) {
             // If 2 questions are right in a row or whatever maxCorrectStreak is set to then switch to harder difficulty
             streaksByDifficulty[currentDifficulty].consecutiveRightAnswers = 0;
             if (currentDifficulty === "Year 10") {
                currentDifficulty = "Year 11";
             } else if (currentDifficulty === "Year 11") {
                currentDifficulty = "Year 12";
             }
          }
 
          if (streaksByDifficulty[currentDifficulty].consecutiveWrongAnswers >= maxLoseStreak) {
             // If 2 questions are wrong in a row or whatever maxLoseStreak is set to then switch to harder difficulty
             streaksByDifficulty[currentDifficulty].consecutiveWrongAnswers = 0;
             if (currentDifficulty === "Year 11") {
                currentDifficulty = "Year 10";
             } else if (currentDifficulty === "Year 12") {
                currentDifficulty = "Year 11";
             }
          }
 
 
          // Show modal
          resultModal.classList.add("show");
          resultModal.style.display = "block";
          currentQuestionIndex++;
 
          const nextQuestionButton = document.querySelector(".next-question-button");
          // Next question button clicked
          nextQuestionButton.addEventListener("click", function () {
             resultModal.classList.remove("show");
             resultModal.style.display = "none";
             if (currentQuestionIndex != 24) {
                loadQuestion(currentQuestionIndex);
             } else {
                // Code for when quiz is completed
                fetch("/save-Result", {
                      method: "POST",
                      headers: {
                         "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                         currentDifficulty,
                         sessionIdentifier
                      }),
                   })
                   .then((response) => response.json())
                   .then((data) => {
                      // Handle the response data
                      console.log("Response:", data);
                   })
                   .catch((error) => {
                      console.error("Error:", error);
                   });
                window.location.href = `/resultspage?sessionIdentifier=${sessionIdentifier}`;
             }
             disableSubmitButton();
             radioButtons.forEach(function (radioButton) {
               radioButton.disabled = false;
            });
             
          });
 
       } else {
          alert("Please select an answer");
       }
 
    });
 });