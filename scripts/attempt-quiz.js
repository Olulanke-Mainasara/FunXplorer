document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const subject = urlParams.get("subject");

  const documentTitle = document.getElementById("document-title");
  documentTitle.textContent = `Quiz | ${subject} - FunXplorer`;

  const quizTitle = document.getElementById("quiz-title");
  quizTitle.innerHTML = `Subject: <span>${subject}</span>`;

  const quizNumber = document.getElementById("question-number");

  const questions = {
    Biology: [
      {
        question: "Which organ pumps blood throughout the body?",
        options: ["Liver", "Lungs", "Heart", "Kidney"],
        answerIndex: 2,
      },
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"],
        answerIndex: 1,
      },
      {
        question: "What is the basic unit of life?",
        options: ["Organ", "Cell", "Tissue", "Organism"],
        answerIndex: 1,
      },
      {
        question: "Which gas do plants absorb during photosynthesis?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        answerIndex: 1,
      },
      {
        question: "What is the process of converting food into energy called?",
        options: ["Photosynthesis", "Digestion", "Respiration", "Fermentation"],
        answerIndex: 2,
      },
    ],

    Physics: [
      {
        question: "What is the SI unit of force?",
        options: ["Joule", "Watt", "Newton", "Pascal"],
        answerIndex: 2,
      },
      {
        question: "What type of energy is stored in a stretched rubber band?",
        options: [
          "Kinetic energy",
          "Thermal energy",
          "Elastic potential energy",
          "Chemical energy",
        ],
        answerIndex: 2,
      },
      {
        question: "What is the speed of light in vacuum?",
        options: [
          "300,000 m/s",
          "3,000,000 m/s",
          "300,000,000 m/s",
          "30,000 m/s",
        ],
        answerIndex: 2,
      },
      {
        question: "What force keeps planets in orbit around the sun?",
        options: ["Friction", "Magnetism", "Gravity", "Electric force"],
        answerIndex: 2,
      },
    ],

    Chemistry: [
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Au", "Ag", "Gd"],
        answerIndex: 1,
      },
      {
        question: "What is the pH of pure water?",
        options: ["7", "5", "9", "2"],
        answerIndex: 0,
      },
      {
        question: "What is the chemical formula for table salt?",
        options: ["KCl", "NaOH", "NaCl", "CaCO₃"],
        answerIndex: 2,
      },
      {
        question: "Which of these is an acid?",
        options: ["NaCl", "H₂O", "HCl", "NH₃"],
        answerIndex: 2,
      },
    ],

    History: [
      {
        question: "Who was the first President of the United States?",
        options: [
          "Abraham Lincoln",
          "George Washington",
          "Thomas Jefferson",
          "John Adams",
        ],
        answerIndex: 1,
      },
      {
        question: "In which year did World War II begin?",
        options: ["1935", "1939", "1941", "1945"],
        answerIndex: 1,
      },
      {
        question:
          "What was the main purpose of the United Nations when it was founded in 1945?",
        options: [
          "To maintain international peace and security",
          "To expand global trade",
          "To form a world government",
          "To eliminate monarchy",
        ],
        answerIndex: 0,
      },
    ],

    Math: [
      {
        question: "What is 7 × 8?",
        options: ["54", "56", "64", "72"],
        answerIndex: 1,
      },
      {
        question: "What is the square root of 81?",
        options: ["7", "8", "9", "10"],
        answerIndex: 2,
      },
      {
        question: "What is 15% of 200?",
        options: ["20", "25", "30", "35"],
        answerIndex: 2,
      },
      {
        question: "Solve: 2³ = ?",
        options: ["6", "8", "9", "12"],
        answerIndex: 1,
      },
    ],

    English: [
      {
        question: "Which of these is a synonym for 'happy'?",
        options: ["Sad", "Joyful", "Angry", "Tired"],
        answerIndex: 1,
      },
      {
        question: "Which of these is a noun?",
        options: ["Run", "Quickly", "Table", "Beautiful"],
        answerIndex: 2,
      },
      {
        question: "What is the past tense of 'go'?",
        options: ["Goes", "Gone", "Went", "Going"],
        answerIndex: 2,
      },
      {
        question: "Which word is a pronoun?",
        options: ["Run", "She", "Jump", "Dog"],
        answerIndex: 1,
      },
    ],
  };

  let selectedQuestions = questions[subject] || [];
  let score = 0;
  let currentQuestionIndex = 0;

  function displayQuestion(index) {
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const currentQuestion = selectedQuestions[index];

    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    quizNumber.innerHTML = `Question ${
      currentQuestionIndex + 1
    } <span>of</span> ${selectedQuestions.length}`;

    currentQuestion.options.forEach((option, i) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;
      optionButton.onclick = function () {
        if (i === currentQuestion.answerIndex) {
          score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
          displayQuestion(currentQuestionIndex);
        } else {
          displayScore();
        }
      };
      optionsContainer.appendChild(optionButton);
    });
  }

  function displayScore() {
    const noOfQuestions = selectedQuestions.length;
    const percentage = (score / noOfQuestions) * 100;
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h2>Your score is: ${score} <span>/</span> ${
      selectedQuestions.length
    }</h2><p>Percentage <span>correctly</span> answered: ${percentage.toFixed(
      1
    )}%</p><button id="retake-quiz">Retake Quiz</button>`;
    quizContainer.classList.add("score");
    quizContainer.style.flexDirection = "column";
    const retakeQuizButton = document.getElementById("retake-quiz");
    retakeQuizButton.addEventListener("click", function () {
      window.location.reload();
    });
  }

  if (selectedQuestions.length > 0) {
    displayQuestion(currentQuestionIndex);
  } else {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h2>No questions available for the selected subject.</h2>`;
  }
});
