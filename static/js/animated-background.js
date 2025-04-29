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

// Create a star element
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');

  // Adjust star size based on device
  const minSize = isMobile() ? 0.8 : 0.6;
  const maxSize = isMobile() ? 1.3 : 1;
  const size = random(minSize, maxSize);

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  // Random position across page
  star.style.top = `${random(0, document.documentElement.scrollHeight)}px`;
  star.style.left = `${random(0, window.innerWidth)}px`;

  // Random sparkle duration
  star.style.animationDuration = `${random(1.5, 5)}s`;
  star.style.animationDelay = `${random(0, 5)}s`;

  starfield.appendChild(star);

  // Recycle star on animationiteration
  star.addEventListener('animationiteration', () => {
    star.style.top = `${random(0, document.documentElement.scrollHeight)}px`;
    star.style.left = `${random(0, window.innerWidth)}px`;
  });

  // Remove star when animation ends and star is faded
  star.addEventListener('animationend', () => {
    const opacity = parseFloat(getComputedStyle(star).opacity);
    if (opacity < 0.05) {
      star.remove(); // Remove faded star
    } else {
      // Optionally reposition again (not strictly needed)
      star.style.top = `${random(0, document.documentElement.scrollHeight)}px`;
      star.style.left = `${random(0, window.innerWidth)}px`;
    }
  });
}

// Create multiple stars
function createStars(count) {
  for (let i = 0; i < count; i++) {
    createStar();
  }
}

// Initial stars
createStars(30);

// Add more stars over time
setInterval(() => {
  const numStars = isMobile() ? 1 : 2; // Always integer
  createStars(numStars);
}, 3000);

// Optional: continuously recycle stars if they go offscreen (advanced optimization)
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

// Start recycling
recycleStars();
