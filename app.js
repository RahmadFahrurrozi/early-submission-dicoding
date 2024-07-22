document.addEventListener("DOMContentLoaded", function () {
  const scrollToNoteFormButton = document.querySelector("#scroll-to-note-form");

  scrollToNoteFormButton.addEventListener("click", function (event) {
    event.preventDefault();
    const noteFormSection = document.querySelector("#note-form");
    noteFormSection.scrollIntoView({ behavior: "smooth" });
  });
});
