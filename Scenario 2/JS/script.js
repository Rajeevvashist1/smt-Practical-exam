const questions = [
  {
    question: "Which keyword declares a constant variable?",
    options: ["var", "let", "const", "static"],
    correctAnswer: 2
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!-- -->", "//", "##", "**"],
    correctAnswer: 1
  },
  {
    question: "Which method adds an item to the end of an array?",
    options: ["push()", "pop()", "shift()", "join()"],
    correctAnswer: 0
  },
  {
    question: "Which keyword is used to declare a function?",
    options: ["function", "method", "define", "func"],
    correctAnswer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionCount = document.getElementById("question-count");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

function showQuestion() {
  selectedAnswer = null;
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1 ? "Finish" : "Next";

  const current = questions[currentQuestion];
  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = current.question;
  optionsContainer.innerHTML = "";

  current.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "option";
    label.innerHTML = `
      <input type="radio" name="answer" value="${index}">
      <span>${option}</span>
    `;
    const radio = label.querySelector("input");
    radio.addEventListener("change", () => {
      selectedAnswer = index;
      nextButton.disabled = false;
    });
    optionsContainer.appendChild(label);
  });
}

function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  const percentage = Math.round((score / questions.length) * 100);
  document.getElementById("score").textContent = `${score} / ${questions.length}`;

  let message;
  if (percentage === 100) {
    message = "You scored 100%. Excellent work!";
  } else if (percentage >= 50) {
    message = `You scored ${percentage}%. Good job!`;
  } else {
    message = `You scored ${percentage}%. Keep practicing!`;
  }
  document.getElementById("result-message").textContent = message;
}

nextButton.addEventListener("click", () => {
  if (selectedAnswer === null) return;

  if (selectedAnswer === questions[currentQuestion].correctAnswer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

document.getElementById("restart-btn").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
});

showQuestion();
