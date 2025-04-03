// Declare variables to store the timer interval and elapsed seconds
let timerInterval;
let elapsedSeconds = 0;

/**
 * Starts the timer.
 * @param {number|null} duration - The duration of the timer in seconds. If null, the timer runs indefinitely.
 */
function startTimer(duration = null) {
  // Clear any existing timer to avoid multiple intervals running simultaneously
  clearInterval(timerInterval);
  elapsedSeconds = 0;

  // Get the timer display element and add the "active" class to brighten the display
  const timerDisplay = document.getElementById("timer-display");
  timerDisplay.classList.add("active");

  // Start a new interval that updates the timer every second
  timerInterval = setInterval(() => {
    elapsedSeconds++; // Increment the elapsed seconds

    // Calculate minutes and seconds from the elapsed time
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;

    // Update the timer display with the formatted time
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    // If a duration is set and the timer reaches the duration, stop the timer
    if (duration && elapsedSeconds >= duration) {
      clearInterval(timerInterval); // Stop the timer
      timerDisplay.classList.remove("active"); // Remove the "active" class to dim the display
      alert("Timer finished!"); // Notify the user that the timer is done
    }
  }, 1000); // Run the interval every 1000 milliseconds (1 second)
}

/**
 * Stops the timer.
 */
function stopTimer() {
  clearInterval(timerInterval); // Stop the timer interval
  document.getElementById("timer-display").classList.remove("active"); // Remove the "active" class to dim the display
}

/**
 * Resets the timer to 00:00 and stops it.
 */
function resetTimer() {
  clearInterval(timerInterval); // Stop the timer interval
  elapsedSeconds = 0; // Reset the elapsed seconds to 0

  // Get the timer display element and reset its content to "00:00"
  const timerDisplay = document.getElementById("timer-display");
  timerDisplay.textContent = "00:00";

  // Remove the "active" class to dim the display
  timerDisplay.classList.remove("active");
}

// Add an event listener to the "Start" button
document.getElementById("start-timer").addEventListener("click", () => {
  // Get the duration input value (in minutes) and convert it to seconds
  const durationInput = document.getElementById("timer-duration").value;
  const duration = durationInput ? parseInt(durationInput, 10) * 60 : null;

  // Start the timer with the specified duration (or indefinitely if no duration is set)
  startTimer(duration);
});

// Add an event listener to the "Stop" button
document.getElementById("stop-timer").addEventListener("click", stopTimer);

// Add an event listener to the "Reset" button
document.getElementById("reset-timer").addEventListener("click", resetTimer);
