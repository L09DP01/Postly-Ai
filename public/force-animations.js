// Force animations to show after page load
document.addEventListener('DOMContentLoaded', function() {
  // Add animate-on-load class to all elements with opacity:0
  const elements = document.querySelectorAll('[style*="opacity:0"]');
  elements.forEach(el => {
    setTimeout(() => {
      el.classList.add('animate-on-load');
    }, 100);
  });
});

// Also run on window load as backup
window.addEventListener('load', function() {
  const elements = document.querySelectorAll('[style*="opacity:0"]');
  elements.forEach(el => {
    el.classList.add('animate-on-load');
  });
});
