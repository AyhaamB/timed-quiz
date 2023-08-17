// Setting global variables
let timerEl = document.getElementById("countdown");
let timeLeft = 60;
let timerInterval;
let finalScore = 0;  // 'undefined' 
let startButton = document.querySelector("#button");
let resetButton = document.querySelector("#resetbutton");
let score = 0;
let displayScore = document.querySelector(".score")

const questionEl = document.querySelector(".question");
const options = document.querySelector(".options");
const resultEl = document.querySelector(".result");
const playerEl = document.querySelector(".player-list");

playerEl.innerHTML = localStorage.getItem("player");

// Setting the initial index for the questions to 0
let currentQuestionIndex = 0

// Creating an array for the questions and answers
let questions = [
    {
        question: "What does HTML stand for?",
        options: [
            { text: "Hey Team Meet Later", correct: false },
            { text: "How To Make Lasagna", correct: false },
            { text: "Hypertext Markdown Language", correct: false },
            { text: "Hypertext Markup Language", correct: true }
        ]
    },
    {
        question: "What does CSS stand for?",
        options: [
            { text: "Can Seriously Style", correct: false },
            { text: "Central Syntax Style", correct: false },
            { text: "Cascading Style Sheet", correct: true },
            { text: "Cascading Sheet Style", correct: false }
        ]
    },
    {
        question: "What year was JavaScript created?",
        options: [
            { text: "1995", correct: true },
            { text: "2005", correct: false },
            { text: "1993", correct: false },
            { text: "2013", correct: false }
        ]
    },
    {
        question: "What is jQuery?",
        options: [
            { text: "A JavaScript Library", correct: true },
            { text: "A Question", correct: false },
            { text: "A Java Library", correct: false },
            { text: "A Physical Library", correct: false }
        ]
    },
    {
        question: "Visual Studio Code is an Example of?",
        options: [
            { text: "Wearable Glasses", correct: false },
            { text: "An Integrated Development Environment Software", correct: true },
            { text: "A Place I Know In Ontario", correct: false },
            { text: "A Place To Record Music", correct: false }
        ]
    }
];

//Function that will display the first question of the quiz
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
//Creates buttons within the options class that will be displayed for each question
    options.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option.text;
        optionButton.classList.add("option");
        optionButton.addEventListener("click", () => checkAnswer(option.correct));
        options.appendChild(optionButton);
    });
    resultEl.textContent = "";
}
// Adds to the current question index and will display the next question as long as there is an additional one to display
function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
}

// Checks the answer of each question, if correct it will display correct and cycle to the next question, if incorrect -10 to time
function checkAnswer(isCorrect) {
//  if (isCorrect && timeLeft > 0) {
    if (isCorrect) {
        resultEl.textContent = "Correct!";
        setTimeout(showNextQuestion, 1000);
        score++;
        finalScore = score / 5 * 100;
        displayScore.textContent = ("Score: " + finalScore)
        if (currentQuestionIndex === questions.length - 1) {
            endQuiz();
        }
    } else {
        resultEl.textContent = "Incorrect. Try again! (Time Penalty -10 seconds)";
        timeLeft -= 10;
    }
}

// Starts the quiz by calling the showQuestion function, also starts a timer that will check the timer of the quiz every second 
function startQuiz() {
    timerInterval = setInterval(timer, 1000);
    questionEl.textContent
    showQuestion();
}

// Ends the quiz displaying finished and a final score. Prompts the player to enter their initials to track the most recent score
function endQuiz() {
    clearInterval(timerInterval);
    timerEl.textContent = "FINISHED!";
    var initials = prompt("Enter Initials, Final Score: " + finalScore + "%");
    localStorage.setItem('player', "Previous Player: " + initials + " | Score: " + finalScore + "%");
    playerEl.innerHTML = localStorage.getItem("player");
}
// Checks if the timer is less than or equal to zero, if it is the quiz will end
function timer() {
    if (timeLeft <= 0) {
        endQuiz();
    }
    timeLeft--
    timerEl.textContent = "Timer: " + timeLeft + " second(s)";
}

// Calculates the final score by dividing the amount of correct answers by 5 (the amount of questions) and multiplying by 100 to get a percentage
function calcScore() {
    finalScore = score / 5 * 100;
}

// Resets the window by refreashing it and setting the timer back to its original value
function reset() {
    clearInterval(timerInterval);
    timeLeft = 60;
    timerEl.textContent = "Timer: " + timeLeft + " second(s)";
    window.location.reload();
}

// Once the start button it clicked it will call the startQuiz function
startButton.addEventListener("click", startQuiz)

// Once the resetButton is click it will cal the reset function
resetButton.addEventListener("click", reset)