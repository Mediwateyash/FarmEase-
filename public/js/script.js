// Carousel Functionality
let currentSlide = 0;

// Function to show the current slide
function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  // Handle edge cases
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  // Hide all slides
  slides.forEach((slide, i) => {
    slide.style.display = i === currentSlide ? 'block' : 'none';
  });
}

// Function to go to the next slide
function nextSlide() {
  showSlide(currentSlide + 1);
}

// Function to go to the previous slide
function prevSlide() {
  showSlide(currentSlide - 1);
}

// Auto-play the carousel (optional)
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Initialize the carousel
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide); // Show the first slide
  startAutoPlay(); // Start auto-play
});

// Pause auto-play on hover (optional)
const carousel = document.querySelector('.carousel');
if (carousel) {
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
}