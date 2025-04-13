function ActivateCalc(calcnumT, calcnumB, calcnumBtns, calcEquals) {
  let topRBox = document.getElementById(calcnumT);
  let bottomRBox = document.getElementById(calcnumB);

  let buttons = document.querySelectorAll(calcnumBtns);

  buttons.forEach((button) => {
    button.onclick = () => {
      // Clear the calculator display when the "clear" button is clicked
      if (button.id === "clear") {
        topRBox.innerText = "0";
        bottomRBox.innerText = "0";
        return;
      }

      // Handle overflow errors for the top display
      if (topRBox.innerText.length > 10) {
        topRBox.innerText = "Error!";
        bottomRBox.innerText = "0";
        const timeOut = setTimeout(() => (topRBox.innerText = "0"), 3000); // Reset after 3 seconds
        return;
      }

      // Handle overflow errors for the bottom display
      if (bottomRBox.innerText.length > 10) {
        bottomRBox.innerText = "Error!";
        const timeOut = setTimeout(() => (bottomRBox.innerText = "0"), 3000); // Reset after 3 seconds
        return;
      }

      // Prevent invalid operations when the bottom display is "0"
      if (
        (button.value === "x2" && bottomRBox.innerText === "0") ||
        (button.value === "rtx" && bottomRBox.innerText === "0") ||
        (button.value === "000" && bottomRBox.innerText === "0") ||
        (button.value === "(" && bottomRBox.innerText === "0") ||
        (button.value === ")" && bottomRBox.innerText === "0")
      ) {
        topRBox.innerText = "0";
        bottomRBox.innerText = "0";
        return;
      }

      // Evaluate the expression when the equals button is clicked
      if (button.id === calcEquals) {
        topRBox.innerText = eval(bottomRBox.innerText);
      }
      // Handle appending "000" when the bottom display is "0"
      else if (bottomRBox.innerText === "0" && button.value === "000") {
        topRBox.innerText = "0";
        bottomRBox.innerText = "0";
      }
      // Handle non-operation inputs when the bottom display is "0"
      else if (
        bottomRBox.innerText === "0" &&
        button.classList[0] !== "operation"
      ) {
        topRBox.innerText = "";
        bottomRBox.innerText = "";
        bottomRBox.innerText += button.value;
        topRBox.innerText = eval(bottomRBox.innerText);
      }
      // Prevent invalid operations when the bottom display is "0"
      else if (
        bottomRBox.innerText === "0" &&
        button.classList[0] === "operation"
      ) {
        topRBox.innerText = "0";
        bottomRBox.innerText = "0";
      }
      // Handle square operations
      else if (button.value === "x2" && bottomRBox.innerText !== "0") {
        topRBox.innerText = eval(bottomRBox.innerText) ** 2;
      }
      // Handle square root operations
      else if (button.value === "rtx" && bottomRBox.innerText !== "0") {
        topRBox.innerText = Math.sqrt(eval(bottomRBox.innerText));
        return;
      }
      // Handle operations and parentheses
      else if (
        button.classList[0] === "operation" ||
        button.value === "(" ||
        button.value === ")" ||
        (bottomRBox.innerText.includes("(") &&
          !bottomRBox.innerText.includes(")"))
      ) {
        bottomRBox.innerText += button.value;
      }
      // Handle general input and update the display
      else {
        bottomRBox.innerText += button.value;
        topRBox.innerText = eval(bottomRBox.innerText);
      }
    };
  });
}

// Activate the calculator with the specified IDs and classes
ActivateCalc("topRBox", "bottomRBox", "button", "equals-to");
