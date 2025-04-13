let timerInterval;
let elapsedSeconds = 0;

// Function to start the timer
function startTimer(duration = null) {
  clearInterval(timerInterval); // Clear any existing timer interval
  elapsedSeconds = 0;

  const timerDisplay = document.getElementById("timer-display");
  timerDisplay.classList.add("active");

  // Start a new interval that updates the timer every second
  timerInterval = setInterval(() => {
    elapsedSeconds++;

    // Calculate minutes and seconds from the elapsed time
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;

    // Update the timer display with the formatted time
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    // Stop the timer and alert the user when the duration is reached
    if (duration && elapsedSeconds >= duration) {
      clearInterval(timerInterval);
      timerDisplay.classList.remove("active");
      alert("Timer finished!");
    }
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval); // Stop the timer interval
  document.getElementById("timer-display").classList.remove("active");
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  elapsedSeconds = 0;

  const timerDisplay = document.getElementById("timer-display");
  timerDisplay.textContent = "00:00";

  timerDisplay.classList.remove("active");
}

document.getElementById("start-timer").addEventListener("click", () => {
  const durationInput = document.getElementById("timer-duration").value; // Get the input duration
  const duration = durationInput ? parseInt(durationInput, 10) * 60 : null; // Convert minutes to seconds

  startTimer(duration); // Start the timer with the specified duration
});

document.getElementById("stop-timer").addEventListener("click", stopTimer);

document.getElementById("reset-timer").addEventListener("click", resetTimer);
