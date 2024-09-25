// Quiz Data
const questions = [
    {
        question: "Who wrote 'Hamlet'?",
        choices: ["Shakespeare", "Dante", "Homer", "Chaucer"],
        answer: "Shakespeare"
    },
    {
        question: "What is the capital of Japan?",
        choices: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        answer: "Tokyo"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "In which year did the Titanic sink?",
        choices: ["1912", "1905", "1898", "1920"],
        answer: "1912"
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Claude Monet", "Pablo Picasso", "Leonardo da Vinci"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        choices: ["Gold", "Iron", "Diamond", "Silver"],
        answer: "Diamond"
    },
    {
        question: "Which country is home to the kangaroo?",
        choices: ["South Africa", "Australia", "India", "Brazil"],
        answer: "Australia"
    },
    {
        question: "What is the chemical symbol for water?",
        choices: ["H2O", "O2", "CO2", "NaCl"],
        answer: "H2O"
    },
    {
        question: "How many continents are there on Earth?",
        choices: ["5", "6", "7", "8"],
        answer: "7"
    }
];


let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null); // Track user answers

// DOM Elements
const homeScreen = document.getElementById('home');
const startQuizButton = document.getElementById('startQuiz');
const quizContainer = document.getElementById('quizContainer');
const questionTitle = document.getElementById('questionTitle');
const choicesList = document.getElementById('choicesList');
const nextButton = document.getElementById('nextQuestion');
const prevButton = document.getElementById('prevQuestion');
const resultContainer = document.getElementById('resultContainer');
const scoreDisplay = document.getElementById('scoreDisplay');

startQuizButton.addEventListener('click', function() {
    homeScreen.style.display = 'none';  
    quizContainer.style.display = 'block';  
    loadQuestion();  
});

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;

    choicesList.innerHTML = ''; 

    currentQuestion.choices.forEach((choice, index) => {
        const li = document.createElement('li');
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'choice';
        radioInput.value = choice;
        radioInput.id = `choice${index}`;
        radioInput.checked = userAnswers[currentQuestionIndex] === choice;

        const label = document.createElement('label');
        label.htmlFor = `choice${index}`;
        label.textContent = choice;

        li.appendChild(radioInput);
        li.appendChild(label);
        choicesList.appendChild(li);
    });

    prevButton.disabled = currentQuestionIndex === 0;  // Disable 'Previous' button for the first question
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next';
}

// Save the user's answer
function saveAnswer() {
    const selectedOption = document.querySelector('input[name="choice"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
    }
}

// Next Question Button Click Event
nextButton.addEventListener('click', function() {
    saveAnswer();
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        calculateResult();  
    }
});

// Previous Question Button Click Event
prevButton.addEventListener('click', function() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

// Calculate and display the result
function calculateResult() {
    let score = 0;
    let resultHTML = '';

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index] || "No answer";
        const isCorrect = userAnswer === question.answer;

        if (isCorrect) {
            score++;
        }

        resultHTML += `
            <div>
                <h4>${index + 1}. ${question.question}</h4>
                <p>Your Answer: <strong>${userAnswer}</strong></p>
                <p>Correct Answer: <strong>${question.answer}</strong></p>
                <p>${isCorrect ? '<span style="color: green;">Correct</span>' : '<span style="color: red;">Incorrect</span>'}</p>
                <hr>
            </div>
        `;
    });

    // Display the final score
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
    resultContainer.style.display = 'block';
    quizForm.style.display = 'none';
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';


    const detailedResultsContainer = document.getElementById('detailedResults');
    detailedResultsContainer.innerHTML = resultHTML;


    questionTitle.style.display = 'none';
}