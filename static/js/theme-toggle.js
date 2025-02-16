document.addEventListener('DOMContentLoaded', function() {
  // Immediately set the theme before any content is rendered
  let currentTheme = localStorage.getItem('theme') || 'heliotrope';
  
  // Apply the theme as soon as possible (before the content is rendered)
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Once the theme is applied, reveal the page content
  document.body.style.visibility = 'visible';

  // Handle theme toggle on button click
  const themeToggleButton = document.getElementById('theme-toggle');
  themeToggleButton.addEventListener('click', function() {
    let newTheme;
    if (currentTheme === 'heliotrope') {
      newTheme = 'viking';
    } else if (currentTheme === 'viking') {
      newTheme = 'red';
    } else if (currentTheme === 'red') {
      newTheme = 'matrix';
    } else {
      newTheme = 'heliotrope';
    }

    // Save the new theme to localStorage
    localStorage.setItem('theme', newTheme);

    // Apply the new theme
    document.documentElement.setAttribute('data-theme', newTheme);

    // Update the currentTheme variable
    currentTheme = newTheme;
  });
});
