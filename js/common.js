// Common functionality for back buttons and navigation
// Handle back buttons
const backButtons = document.querySelectorAll('[data-back-button]');
backButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    window.history.back();
  });
});

// Handle home buttons
const homeButtons = document.querySelectorAll('[data-home-button]');
homeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = btn.dataset.homeButton;
  });
});

