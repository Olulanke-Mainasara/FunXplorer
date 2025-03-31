import { questions } from "./quiz-questions.js";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const subject = urlParams.get("subject");

  const documentTitle = document.getElementById("document-title");
  if (documentTitle) {
    documentTitle.textContent = `Quiz | ${subject || "Unknown"} - FunXplorer`;
  }

  const quizTitle = document.getElementById("quiz-title");
  if (quizTitle) {
    quizTitle.innerHTML = `Subject: <span>${subject || "Unknown"}</span>`;
  }

  const quizNumber = document.getElementById("question-number");
  const controlContainer = document.getElementById("control-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let selectedQuestions = questions[subject] || [];
  let score = 0;
  let currentQuestionIndex = 0;
  let optionSelected = false;

  function displayQuestion(index) {
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");

    if (!selectedQuestions[index]) return;

    const currentQuestion = selectedQuestions[index];

    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    quizNumber.innerHTML = `Question ${index + 1} <span>of</span> ${
      selectedQuestions.length
    }`;

    currentQuestion.options.forEach((option, i) => {
      const optionButton = document.createElement("button");
      optionButton.classList.add("option-btn");
      optionButton.textContent = option;

      optionButton.onclick = function () {
        document
          .querySelectorAll(".option-btn")
          .forEach((btn) => btn.classList.remove("selected"));
        optionButton.classList.add("selected");

        optionSelected = true;
        nextBtn.disabled = false;

        if (i === currentQuestion.answerIndex) {
          score++;
        }
      };

      optionsContainer.appendChild(optionButton);
    });

    optionSelected = false;
    nextBtn.disabled = true;
  }

  function displayPrevBtn() {
    if (currentQuestionIndex === 0) {
      prevBtn.style.display = "none";
      controlContainer.style.justifyContent = "end";
    } else {
      prevBtn.style.display = "block";
      controlContainer.style.justifyContent = "space-between";
    }
  }

  function displayScore() {
    const noOfQuestions = selectedQuestions.length;
    const percentage = (score / noOfQuestions) * 100;
    const quizContainer = document.getElementById("quiz-container");

    quizContainer.innerHTML = `
      <h2>Your score is: ${score} <span>/</span> ${noOfQuestions}</h2>
      <p>Percentage <span>correctly</span> answered: ${percentage.toFixed(
        1
      )}%</p>
      <button id="retake-quiz">Retake Quiz</button>
    `;

    quizContainer.classList.add("score");
    quizContainer.style.flexDirection = "column";

    document.getElementById("retake-quiz").addEventListener("click", () => {
      window.location.reload();
    });
  }

  prevBtn.addEventListener("click", function () {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuestion(currentQuestionIndex);
      displayPrevBtn();
      nextBtn.innerText = "Next";
    }
  });

  nextBtn.addEventListener("click", function () {
    if (!optionSelected) return;

    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
      displayQuestion(currentQuestionIndex);
      displayPrevBtn();

      if (currentQuestionIndex === selectedQuestions.length - 1) {
        nextBtn.innerText = "Finish";
      }
    } else {
      displayScore();
    }
  });

  if (selectedQuestions.length > 0) {
    displayQuestion(currentQuestionIndex);
    displayPrevBtn();
  } else {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h2>No questions available for the selected subject.</h2>`;
  }
});
