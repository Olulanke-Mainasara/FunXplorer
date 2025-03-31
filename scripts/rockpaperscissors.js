document.addEventListener("DOMContentLoaded", function () {
  const choices = ["Rock", "Paper", "Scissors"];
  const resultDisplay = document.getElementById("result");
  const playerChoiceDisplay = document.getElementById("player-choice");
  const computerChoiceDisplay = document.getElementById("computer-choice");

  document.querySelectorAll(".choice-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const playerChoice = this.textContent;
      const computerChoice = choices[Math.floor(Math.random() * 3)];

      playerChoiceDisplay.textContent = `Player: ${playerChoice}`;
      computerChoiceDisplay.textContent = `Computer: ${computerChoice}`;

      if (playerChoice === computerChoice) {
        resultDisplay.textContent = "It's a draw!";
      } else if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissors" && computerChoice === "Paper")
      ) {
        resultDisplay.textContent = "You win!";
      } else {
        resultDisplay.textContent = "You lose!";
      }
    });
  });
});
