let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let modeSelect = document.getElementById("modeSelect"); // Dropdown for selecting mode
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let isComputerOpponent = true; // Default mode is against the computer

// Initialize the game by adding event listeners to boxes and mode selector
const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  modeSelect.addEventListener("change", changeMode); // Listen for mode changes
};

// Handle a box click event
function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer; // Mark the box with the current player's symbol
    e.target.innerText = currentPlayer;

    // Check if the current player has won
    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();

      // Highlight the winning combination
      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    // Switch to the other player
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;

    // If playing against the computer, make the computer's move
    if (isComputerOpponent && currentPlayer === O_TEXT) {
      computerMove();
    }
  }
}

// Handle the computer's move (simple AI logic)
function computerMove() {
  // Find all available spaces
  let availableSpaces = spaces
    .map((space, index) => (space === null ? index : null))
    .filter((index) => index !== null);

  if (availableSpaces.length > 0) {
    // Choose a random available space
    const randomIndex =
      availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    spaces[randomIndex] = O_TEXT;
    boxes[randomIndex].innerText = O_TEXT;

    // Check if the computer has won
    if (playerHasWon() !== false) {
      playerText.innerHTML = `${O_TEXT} has won!`;
      let winning_blocks = playerHasWon();

      // Highlight the winning combination
      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    // Switch back to the human player
    currentPlayer = X_TEXT;
  }
}

// Define all possible winning combinations
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Check if a player has won by matching a winning combination
function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c]; // Return the winning combination
    }
  }
  return false; // No winner yet
}

// Handle mode change (e.g., switching between human vs. human and human vs. computer)
function changeMode(e) {
  isComputerOpponent = e.target.value === "computer";
  restart();
}

// Restart the game by resetting the board and variables
function restart() {
  spaces.fill(null); // Clear the game state

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerText.innerHTML = "Tic Tac Toe";

  currentPlayer = X_TEXT;
}

startGame();
