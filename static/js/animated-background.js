console.log("✅ animated-background.js loaded");

// Create the starfield container
const starfield = document.createElement('div');
starfield.classList.add('starfield');
document.body.appendChild(starfield);

// Function to generate random number
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Create stars
function createStars(numStars) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.width = random(1, 3) + 'px';
    star.style.height = random(1, 3) + 'px';

    // Place stars randomly across the entire document (not just visible viewport)
    star.style.top = random(0, document.body.scrollHeight) + 'px'; // Can be greater than window height for offscreen placement
    star.style.left = random(0, document.body.scrollWidth) + 'px'; // Can be greater than window width

    star.style.animationDuration = random(1, 5) + 's';
    star.style.animationDelay = random(0, 5) + 's';

    starfield.appendChild(star);
  }
}

// Generate stars on page load
createStars(100);

// Optional: Regenerate stars when the page is resized (if necessary)
window.addEventListener('resize', function() {
  createStars(100);
});
