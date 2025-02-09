// Immediately set the theme before any content is rendered
(function() {
  // Get the current theme from localStorage or default to 'default'
  let currentTheme = localStorage.getItem('theme') || 'default';

  // Set the theme on page load, before the page is rendered
  document.documentElement.setAttribute('data-theme', currentTheme);
})();

document.addEventListener('DOMContentLoaded', function() {
  // Log when the theme toggle script is loaded
  // console.log("Theme toggle script loaded");

  const themeToggleButton = document.getElementById('theme-toggle');
  // Check if the theme toggle button is found
  // console.log('Button found:', themeToggleButton);
  
  // Toggle theme when button is clicked
  themeToggleButton.addEventListener('click', function() {
    // console.log('Button clicked!'); // Check if button click is firing

    // Get the current theme
    let currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Cycle through the themes
    let newTheme;
    if (currentTheme === 'default') {
      newTheme = 'pink';
    } else if (currentTheme === 'pink') {
      newTheme = 'red';
    } else if (currentTheme === 'red') {
      newTheme = 'blue';
    } else {
      newTheme = 'default';
    }

    // Save the new theme to localStorage
    localStorage.setItem('theme', newTheme);

    // Apply the new theme
    document.documentElement.setAttribute('data-theme', newTheme);
  });
});