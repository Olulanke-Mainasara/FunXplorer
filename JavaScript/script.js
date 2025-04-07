const sidemenu = document.getElementById("sidemenu");
const sheet = document.getElementById("sheet");

function openmenu() {
  sidemenu.style.right = "0";
  sheet.style.display = "block";
}

function closemenu() {
  sidemenu.style.right = "-280px";
  sheet.style.display = "none";
}

// Add an event listener to the contact form
document
  .querySelector("#contact form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Display a success alert message
    alert("Thank you for reaching out! We will get back to you shortly.");

    // Optionally, reset the form fields
    this.reset();
  });
