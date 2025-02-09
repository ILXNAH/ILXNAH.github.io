document.addEventListener('DOMContentLoaded', function() {
  // Immediately set the theme before any content is rendered
  let currentTheme = localStorage.getItem('theme') || 'default';
  
  // Apply the theme as soon as possible (before the content is rendered)
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Once the theme is applied, reveal the page content
  document.body.style.visibility = 'visible';

  // Handle theme toggle on button click
  const themeToggleButton = document.getElementById('theme-toggle');
  themeToggleButton.addEventListener('click', function() {
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

    // Update the currentTheme variable
    currentTheme = newTheme;
  });
});
