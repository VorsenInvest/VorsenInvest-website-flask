document.addEventListener('DOMContentLoaded', function() {
    var alert = document.querySelector('.animated-alert');
    if (alert) {
      // Start sliding in
      alert.style.opacity = '1';
      alert.style.transform = 'translateY(0)';
  
      // Wait for 5 seconds, then start fading out
      setTimeout(function() {
        alert.style.opacity = '0';
      }, 5000); // Slide in for 5s, then fade out
    }
  });
  