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
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.width = random(1, 3) + 'px';
    star.style.height = random(1, 3) + 'px';
    star.style.top = random(0, window.innerHeight) + 'px';
    star.style.left = random(0, window.innerWidth) + 'px';
    star.style.animationDuration = random(1, 5) + 's';
    star.style.animationDelay = random(0, 5) + 's';

    starfield.appendChild(star);
  }
}

// Generate stars on page load
createStars(100);
