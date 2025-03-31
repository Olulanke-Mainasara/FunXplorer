import { subjects } from "./learning-points.js";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const subject = urlParams.get("subject");

  const documentTitle = document.getElementById("document-title");
  if (documentTitle) {
    documentTitle.textContent = `Learn | ${subject || "Unknown"} - FunXplorer`;
  }

  const subjectTitle = document.getElementById("subject-title");
  if (subjectTitle) {
    subjectTitle.innerText = `${subject || "Unknown"}`;
  }

  const subjectDesc = document.getElementById("subject-description");
  const learningPointsContainer = document.getElementById("learning-points");

  const selectedSubject = subjects.find((s) => s.subject === subject);

  if (selectedSubject) {
    if (subjectDesc) {
      subjectDesc.innerText =
        selectedSubject.description || "Learn more about this subject.";
    }

    if (learningPointsContainer) {
      selectedSubject.notes.forEach((note, index) => {
        const pointElement = document.createElement("div");
        pointElement.classList.add("learning-point");
        pointElement.innerHTML = `
          <h3>${getDynamicTitle(index)}</h3>
          <p>${note}</p>
        `;
        learningPointsContainer.appendChild(pointElement);
      });
    }
  } else {
    if (learningPointsContainer) {
      learningPointsContainer.innerHTML = `<h2>No learning points available for the selected subject.</h2>`;
    }
  }

  // Helper function to generate dynamic titles
  function getDynamicTitle(index) {
    const titles = [
      "Did You Know?",
      "Key Insight",
      "Fun Fact",
      "Quick Tip",
      "Important Note",
      "Core Concept",
      "Interesting Fact",
      "Pro Tip",
      "Essential Idea",
      "Learning Highlight",
    ];
    return titles[index % titles.length];
  }
});
