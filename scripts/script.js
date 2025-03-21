// Go back to the previous page
function goBack() {
  window.history.back();
}

const backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", goBack);
