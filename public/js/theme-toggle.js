// Immediately set the theme before any content is rendered
(function() {
  // Get the current theme from localStorage or default to 'default'
  let currentTheme = localStorage.getItem('theme') || 'default';

  // Set the theme on page load, before the page is rendered
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Remove the "no-flash" class to show the page content after theme is set
  document.body.classList.remove('no-flash');
})();

document.addEventListener('DOMContentLoaded', function() {
  const themeToggleButton = document.getElementById('theme-toggle');
  
  // Toggle theme when button is clicked
  themeToggleButton.addEventListener('click', function() {
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
