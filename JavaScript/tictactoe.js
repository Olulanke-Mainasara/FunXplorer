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

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  modeSelect.addEventListener("change", changeMode); // Listen for mode changes
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;

    if (isComputerOpponent && currentPlayer === O_TEXT) {
      computerMove();
    }
  }
}

function computerMove() {
  // Simple AI: Choose the first available space
  let availableSpaces = spaces
    .map((space, index) => (space === null ? index : null))
    .filter((index) => index !== null);

  if (availableSpaces.length > 0) {
    const randomIndex =
      availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    spaces[randomIndex] = O_TEXT;
    boxes[randomIndex].innerText = O_TEXT;

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${O_TEXT} has won!`;
      let winning_blocks = playerHasWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    currentPlayer = X_TEXT;
  }
}

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

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

function changeMode(e) {
  isComputerOpponent = e.target.value === "computer";
  restart(); // Restart the game when the mode changes
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerText.innerHTML = "Tic Tac Toe";

  currentPlayer = X_TEXT;
}

startGame();
