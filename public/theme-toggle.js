document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-switcher");

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  themeToggle.value = savedTheme;

  themeToggle.addEventListener("change", function () {
    const selectedTheme = this.value;
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  });
});