let currentAnswer;
let currentQuestion;
let score;
let levelWiseQuestions = {
  Easy: questionEasy,
  Medium: questionMedium,
  Hard: questionHard,
};
let levels = ["Easy", "Medium", "Hard"];
let currentLevelMarker = 0;
let currentLevel = levels[currentLevelMarker];
let currentQuestionUsed = levelWiseQuestions[currentLevel];

const AUDIO1 = new Audio("sound-1-167181.mp3");
const AUDIO2 = new Audio("correct-6033.mp3");

const headingEl = document.querySelector("h1");
const questionDisplay = document.querySelector("h4");
const scoreEl = document.querySelector("h3");
const checkAnswerButton = document.getElementById("checkanswer");
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
const easyMediumHard = document.querySelector("h5");
const winConfetti = document.getElementById("confetti");

//event listeners
checkAnswerButton.addEventListener("click", checkAnswer);
aChoice.addEventListener("click", selectChoice);
bChoice.addEventListener("click", selectChoice);
cChoice.addEventListener("click", selectChoice);

function init() {
  score = 0;
  currentQuestion = 0;
  render();
  renderScores();
};

init();
function selectChoice(event) {
  resetAllColors();
  if (event.target === aChoice) {
    currentAnswer = "optionA";
  }
  if (event.target === bChoice) {
    currentAnswer = "optionB";
  }
  if (event.target === cChoice) {
    currentAnswer = "optionC";
  }
  if (currentAnswer === "optionA") {
    aChoice.style.backgroundColor = "rgb(224, 218, 249)";
  } else if (currentAnswer === "optionB") {
    bChoice.style.backgroundColor = "rgb(224, 218, 249)";
  } else if (currentAnswer === "optionC") {
    cChoice.style.backgroundColor = "rgb(224, 218, 249)";
  }
  renderAnswer();
  renderScores();
};

function checkAnswer() {
  if (currentQuestionUsed[currentQuestion].answer === currentAnswer) {
    score++;
    if (currentQuestion < currentQuestionUsed.length - 1) {
      currentQuestion++;
    }
  }
  currentAnswer = null;
  resetAllColors();
  render();
  renderScores();
  checkWin();
};

function checkWin() {
  if (score === currentQuestionUsed.length) {
    winConfetti.style.visibility = "visible";
    headingEl.innerText = "YOU WIN!";
    if (currentLevel === "Hard") {
      checkAnswerButton.removeEventListener("click", checkAnswer);
      checkAnswerButton.addEventListener("click", () => {
        window.location.reload();
      });
      checkAnswerButton.innerText = "Play Again";
    } else {
      checkAnswerButton.innerText = "Next Level";
      currentLevelMarker++;
      currentLevel = levels[currentLevelMarker];
      currentQuestionUsed = levelWiseQuestions[currentLevel];
      score = 0;
      currentQuestion = 0;
    }
  } else {
    checkAnswerButton.innerText = "Next Question";
    winConfetti.style.visibility = "hidden";
  }
};

function renderCorrectAnswer() {
  AUDIO2.play();
  headingEl.innerText = "CORRECT!";
};

function renderIncorrectAnswer() {
  headingEl.innerText = "TRY AGAIN";
  AUDIO1.play();
};

function resetAllColors() {
  optionBDiv.style.backgroundColor = null;
  optionCDiv.style.backgroundColor = null;
  optionADiv.style.backgroundColor = null;
  aChoice.style.backgroundColor = null;
  bChoice.style.backgroundColor = null;
  cChoice.style.backgroundColor = null;
};

function render() {
  easyMediumHard.innerText = levels[currentLevelMarker];
  headingEl.innerText = "QUIZ GAME";
  headingEl.style.animation;
  questionDisplay.innerText = currentQuestionUsed[currentQuestion].question;
  optionA.innerText = currentQuestionUsed[currentQuestion].options.optionA;
  optionB.innerText = currentQuestionUsed[currentQuestion].options.optionB;
  optionC.innerText = currentQuestionUsed[currentQuestion].options.optionC;
};

function renderAnswer() {
  //handle option a
  if (
    currentQuestionUsed[currentQuestion].answer === "optionA" &&
    currentAnswer === "optionA"
  ) {
    renderCorrectAnswer();
    optionADiv.style.backgroundColor = "rgb(217, 231, 214)";
  } else if (
    currentQuestionUsed[currentQuestion].answer !== "optionA" &&
    currentAnswer === "optionA"
  ) {
    optionADiv.style.backgroundColor = "red";
    renderIncorrectAnswer();
  }

  //handle option b
  if (
    currentQuestionUsed[currentQuestion].answer === "optionB" &&
    currentAnswer === "optionB"
  ) {
    renderCorrectAnswer();
    optionBDiv.style.backgroundColor = "rgb(217, 231, 214)";
  } else if (
    currentQuestionUsed[currentQuestion].answer !== "optionB" &&
    currentAnswer === "optionB"
  ) {
    renderIncorrectAnswer();
    optionBDiv.style.backgroundColor = "red";
  }

  //handle option c
  if (
    currentQuestionUsed[currentQuestion].answer === "optionC" &&
    currentAnswer === "optionC"
  ) {
    renderCorrectAnswer();
    optionCDiv.style.backgroundColor = "rgb(217, 231, 214)";
  } else if (
    currentQuestionUsed[currentQuestion].answer !== "optionC" &&
    currentAnswer === "optionC"
  ) {
    renderIncorrectAnswer();
    optionCDiv.style.backgroundColor = "red";
  }
};

function renderScores() {
  scoreEl.innerText = ` score ${score}/5`;
};
