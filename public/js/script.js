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

  // Get the modal and buttons
  const modal = document.getElementById("bookingModal");
  const bookNowBtn = document.querySelector(".cta-buttons .btn[href='#booking']");
  const closeBtn = document.getElementsByClassName("close")[0];

  // Open modal when "Book Now" is clicked
  bookNowBtn.onclick = function (e) {
    e.preventDefault(); // Prevent default link behavior
    modal.style.display = "block"; // Show the modal
  };

  // Close modal when the close button is clicked
  closeBtn.onclick = function () {
    modal.style.display = "none"; // Hide the modal
  };

  // Close modal when clicking outside the modal
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none"; // Hide the modal
    }
  };

  // Handle form submission
  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form data
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const guests = document.getElementById("guests").value;
    const date = document.getElementById("date").value;
    const message = document.getElementById("message").value;

    // Construct WhatsApp message
    const whatsappMessage = `Hello, I would like to book <%= farmhouse.name %>.\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Guests:* ${guests}\n` +
      `*Check-in Date:* ${date}\n` +
      `*Message:* ${message}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Redirect to WhatsApp
    window.location.href = `https://wa.me/+918108705300?text=${encodedMessage}`;
  });
