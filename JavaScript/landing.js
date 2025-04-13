const sidemenu = document.getElementById("sidemenu");
const sheet = document.getElementById("sheet");

// Function to open the side menu
function openmenu() {
  sidemenu.style.right = "0";
  sheet.style.display = "block";
}

// Function to close the side menu
function closemenu() {
  sidemenu.style.right = "-280px";
  sheet.style.display = "none";
}

document
  .querySelector("#contact form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    alert("Thank you for reaching out! We will get back to you shortly.");

    // Reset the form fields after submission
    this.reset();
  });
