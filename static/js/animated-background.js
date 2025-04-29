// console.log("✅ animated-background.js loaded");

// Create starfield container
const starfield = document.createElement('div');
starfield.classList.add('starfield');
document.body.appendChild(starfield);

// Generate random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Detect if device is mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Create a single star
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');

  const minSize = isMobile() ? 0.8 : 0.6;
  const maxSize = isMobile() ? 1.3 : 1;
  const size = random(minSize, maxSize);

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  star.style.top = `${random(0, document.documentElement.scrollHeight)}px`;
  star.style.left = `${random(0, window.innerWidth)}px`;

  // Slower twinkle speed
  star.style.animationDuration = `${random(3, 8)}s`;
  star.style.animationDelay = `${random(0, 5)}s`;

  starfield.appendChild(star);

  star.addEventListener('animationiteration', () => {
    star.style.top = `${random(0, document.documentElement.scrollHeight)}px`;
    star.style.left = `${random(0, window.innerWidth)}px`;
  });

  star.addEventListener('animationend', () => {
    const opacity = parseFloat(getComputedStyle(star).opacity);
    if (opacity < 0.05) {
      star.remove();
    } else {
      star.style.top = `${random(0, document.documentElement.scrollHeight)}px`;
      star.style.left = `${random(0, window.innerWidth)}px`;
    }
  });
}

// Create initial batch
function createInitialStars(count) {
  for (let i = 0; i < count; i++) {
    createStar();
  }
}

// Random star creation with random timing
function startRandomStarCreation() {
  const delay = random(500, 2500); // Random between 0.5s and 2.5s

  setTimeout(() => {
    const starsToCreate = Math.random() < 0.7 ? 1 : 2; // Mostly 1 star, rarely 2
    createInitialStars(starsToCreate);
    startRandomStarCreation(); // Recurse!
  }, delay);
}

// Optional recycling if needed
function recycleStars() {
  setInterval(() => {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
      const rect = star.getBoundingClientRect();
      if (rect.bottom < 0 || rect.right < 0 || rect.top > window.innerHeight || rect.left > window.innerWidth) {
        star.style.top = `${random(0, document.documentElement.scrollHeight)}px`;
        star.style.left = `${random(0, window.innerWidth)}px`;
      }
    });
  }, 100);
}

// --- Start everything ---
createInitialStars(30); // Initial load
startRandomStarCreation(); // Ongoing random spawns
recycleStars(); // Keep recycling
