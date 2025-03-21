function ActivateCalc(calcnumT, calcnumB, calcnumBtns, calcEquals) {
  let topRBox = document.getElementById(calcnumT);
  let bottomRBox = document.getElementById(calcnumB);

  let buttons = document.querySelectorAll(calcnumBtns);

  buttons.forEach((button) => {
    button.onclick = () => {
      if (button.id === "clear") {
        topRBox.innerText = "0";
        bottomRBox.innerText = "0";
        return;
      }

      if (topRBox.innerText.length > 10) {
        topRBox.innerText = "Error!";
        bottomRBox.innerText = "0";
        const timeOut = setTimeout(() => (topRBox.innerText = "0"), 3000);
        return;
      }

      if (bottomRBox.innerText.length > 10) {
        bottomRBox.innerText = "Error!";
        const timeOut = setTimeout(() => (bottomRBox.innerText = "0"), 3000);
        return;
      }

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

      if (button.id === calcEquals) {
        topRBox.innerText = eval(bottomRBox.innerText);
      } else if (bottomRBox.innerText === "0" && button.value === "000") {
        topRBox.innerText = "0";
        bottomRBox.innerText = "0";
      } else if (
        bottomRBox.innerText === "0" &&
        button.classList[0] !== "operation"
      ) {
        topRBox.innerText = "";
        bottomRBox.innerText = "";
        bottomRBox.innerText += button.value;
        topRBox.innerText = eval(bottomRBox.innerText);
      } else if (
        bottomRBox.innerText === "0" &&
        button.classList[0] === "operation"
      ) {
        topRBox.innerText = "0";
        bottomRBox.innerText = "0";
      } else if (button.value === "x2" && bottomRBox.innerText !== "0") {
        topRBox.innerText = eval(bottomRBox.innerText) ** 2;
      } else if (button.value === "rtx" && bottomRBox.innerText !== "0") {
        topRBox.innerText = Math.sqrt(eval(bottomRBox.innerText));
        return;
      } else if (
        button.classList[0] === "operation" ||
        button.value === "(" ||
        button.value === ")" ||
        (bottomRBox.innerText.includes("(") &&
          !bottomRBox.innerText.includes(")"))
      ) {
        bottomRBox.innerText += button.value;
      } else {
        bottomRBox.innerText += button.value;
        topRBox.innerText = eval(bottomRBox.innerText);
      }
    };
  });
}

ActivateCalc("topRBox", "bottomRBox", "button", "equals-to");
