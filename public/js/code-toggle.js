document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".expand-code").forEach(button => {
    button.addEventListener("click", function () {
      let preBlock = this.previousElementSibling;  // Get the previous <pre> element (the code block)
      preBlock.classList.toggle("expanded");  // Toggle the expanded class
      this.textContent = preBlock.classList.contains("expanded") ? "Show Less" : "Show More";  // Change the button text
    });
  });
});
