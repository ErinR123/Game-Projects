let currentAnswer;
let currentQuestion;
let score;
const AUDIO1 = new Audio("sound-1-167181.mp3");
const AUDIO2 = new Audio("correct-6033.mp3");

const headingEl = document.querySelector("h1");
const questionDisplay = document.querySelector("h4");
const scoreEl = document.querySelector("h3");
const checkAnswerButton = document.getElementById("check answer");
const aChoice = document.getElementById("a");
const bChoice = document.getElementById("b");
const cChoice = document.getElementById("c");
const answersSection = document.getElementById("answers");
const optionA = document.getElementById("p1");
const optionB = document.getElementById("p2");
const optionC = document.getElementById("p3");
const optionADiv = document.getElementById("option1");
const optionBDiv = document.getElementById("option2");
const optionCDiv = document.getElementById("option3");

let questions = [
  {
    question: "What is the Capitol of Australia?",
    options: {
      optionA: "Canberra",
      optionB: "Melbourne",
      optionC: "Sydney",
    },
    answer: "optionA",
  },
  {
    question: "who sang Piano Man?",
    options: {
      optionA: "Billie Joel",
      optionB: "Queen",
      optionC: "Elton John",
    },
    answer: "optionC",
  },
  {
    question: "What does the acronym URL stand for?",
    options: {
      optionA: "Uniform Resource Locator",
      optionB: "Universal Remote Link",
      optionC: "Unified Resource Locator",
    },
    answer: "optionA",
  },
  {
    question: "In the film The Shawshank Redemption, what is the name of the main character?",
    options: {
      optionA: "Morgan Freeman",
      optionB: "Red",
      optionC: "Andy Dufresne",
    },
    answer: "optionC",
  },
  {
    question: "Who was the first President of the United States?",
    options: {
      optionA: "George Washington",
      optionB: "Thomas Jefferson",
      optionC: "John Adams",
    },
    answer: "optionA",
  },
];

//event listeners
checkAnswerButton.addEventListener("click", checkAnswer);
aChoice.addEventListener("click", (event) => selectChoice(event));
bChoice.addEventListener("click", (event) => selectChoice(event));
cChoice.addEventListener("click", (event) => selectChoice(event));

function init() {
  score = 0;
  currentQuestion = 0;
  render();
}
init();
function selectChoice(event) {
  if (event.target === aChoice) {
    currentAnswer = "optionA";
  }
  if (event.target === bChoice) {
    currentAnswer = "optionB";
  }
  if (event.target === cChoice) {
    currentAnswer = "optionC";
  }
  render();
}
function checkAnswer() {
  renderAnswer();
  setTimeout(render, 2000);
  if (questions[currentQuestion].answer === currentAnswer) {
    AUDIO2.play();
    score++;
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
    }
  } else {
    headingEl.innerText = "TRY AGAIN";
    headingEl.style.color = "rgb(224, 141, 135)";
    AUDIO1.play();
  }
  currentAnswer = null;
  checkWin();
}

function checkWin() {
  if (score === questions.length) {
    headingEl.innerText = "YOU WIN!";
    headingEl.style.color = "rgb(211, 233, 150)";
  }
}
function render() {
  optionBDiv.style.backgroundColor = null;
  optionCDiv.style.backgroundColor = null;
  optionADiv.style.backgroundColor = null;
  aChoice.style.backgroundColor = null;
  bChoice.style.backgroundColor = null;
  cChoice.style.backgroundColor = null;
  questionDisplay.innerText = questions[currentQuestion].question;
  scoreEl.innerText = ` score ${score}/5`;
  optionA.innerText = questions[currentQuestion].options.optionA;
  optionB.innerText = questions[currentQuestion].options.optionB;
  optionC.innerText = questions[currentQuestion].options.optionC;
  if (currentAnswer === "optionA") {
    aChoice.style.backgroundColor = "pink";
  }
  if (currentAnswer === "optionB") {
    bChoice.style.backgroundColor = "pink";
  }
  if (currentAnswer === "optionC") {
    cChoice.style.backgroundColor = "pink";
  }
}
function renderAnswer() {
  optionBDiv.style.backgroundColor = "rgb(224, 141, 135)";
  optionCDiv.style.backgroundColor = "rgb(224, 141, 135)";
  optionADiv.style.backgroundColor = "rgb(224, 141, 135)";
  if (questions[currentQuestion].answer === "optionA") {
    optionADiv.style.backgroundColor = "rgb(217, 231, 214)";
  }
  if (questions[currentQuestion].answer === "optionB") {
    optionBDiv.style.backgroundColor = "rgb(217, 231, 214)";
  }
  if (questions[currentQuestion].answer === "optionC") {
    optionCDiv.style.backgroundColor = "rgb(217, 231, 214)";
  }
}
