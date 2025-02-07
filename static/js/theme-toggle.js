document.addEventListener('DOMContentLoaded', function() {
  console.log("Theme toggle script loaded");
  const themeToggleButton = document.getElementById('theme-toggle');
  console.log('Button found:', themeToggleButton); // Check if the button is found
  let currentTheme = localStorage.getItem('theme') || 'default'; // Retrieve theme from local storage if it exists

  // Set initial theme on page load
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Toggle theme when button is clicked
  themeToggleButton.addEventListener('click', function() {
    console.log('Button clicked!'); // Check if button click is firing
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

    // Update the currentTheme variable to the new theme
    currentTheme = newTheme;
  });
});
