document.addEventListener("DOMContentLoaded", function () {
  // Generate a random number between 1 and 100
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  const resultDisplay = document.getElementById("result");
  const guessInput = document.getElementById("guess-input");
  const submitBtn = document.getElementById("submit-btn");

  submitBtn.addEventListener("click", function () {
    const playerGuess = parseInt(guessInput.value); // Parse the player's input as an integer

    // Check the player's guess and provide feedback
    if (isNaN(playerGuess)) {
      resultDisplay.textContent = "Please enter a valid number!";
    } else if (playerGuess < randomNumber) {
      resultDisplay.textContent = "Too low! Try again.";
    } else if (playerGuess > randomNumber) {
      resultDisplay.textContent = "Too high! Try again.";
    } else {
      resultDisplay.textContent = "Congratulations! You guessed it!";
    }
  });
});
