console.log("✅ animated-background.js loaded");

// Create starfield container
const starfield = document.createElement('div');
starfield.classList.add('starfield');
document.body.appendChild(starfield);

// Function to generate random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to create a star with sparkling effect
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  
  // Smaller stars
  star.style.width = random(0.6, 1) + 'px';  // Smaller stars
  star.style.height = random(0.6, 1) + 'px'; // Smaller stars
  
  // Position stars randomly across the full height and width of the page
  star.style.top = random(0, document.documentElement.scrollHeight) + 'px';
  star.style.left = random(0, window.innerWidth) + 'px';

  // Random animation duration for twinkle and sparkle effects
  star.style.animationDuration = random(1.5, 5) + 's';
  star.style.animationDelay = random(0, 5) + 's';

  starfield.appendChild(star);

  // Remove and reposition stars once they finish their animation cycle
  star.addEventListener('animationiteration', function() {
    star.style.top = random(0, document.documentElement.scrollHeight) + 'px'; // Reposition vertically across full page
    star.style.left = random(0, window.innerWidth) + 'px'; // Reposition horizontally across full page
  });
}

// Start generating stars
function createStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    createStar();
  }
}

// Create fewer stars initially (50 instead of 1000)
createStars(30);

// Optionally add more stars at intervals
setInterval(() => {
  createStars(1.5); // Add 5 stars at a time
}, 3000); // Adjust interval as needed

// Continuously recycle stars when they leave the viewport
function recycleStars() {
  setInterval(() => {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
      const rect = star.getBoundingClientRect();
      // Check if the star is off the screen
      if (rect.top > window.innerHeight || rect.left > window.innerWidth || rect.top < 0 || rect.left < 0) {
        // Reposition star back into the full page area
        star.style.top = random(0, document.documentElement.scrollHeight) + 'px'; // Reposition vertically
        star.style.left = random(0, window.innerWidth) + 'px'; // Reposition horizontally
      }
    });
  }, 100); // Reposition stars every 100ms
}

// Start recycling stars to keep the effect continuous
recycleStars();
