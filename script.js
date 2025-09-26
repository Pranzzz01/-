(function() {
  // Configuration - Update these values
  const TARGET_DATE = new Date('2025-10-14T00:00:00'); // Change to your special date
  const YOUR_NAME = 'You';
  const PARTNER_NAME = 'My Beautiful Rose';

  // Countdown Timer
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = TARGET_DATE.getTime() - now;

    if (distance < 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }

  // Surprise Functions
  function revealSurprise() {
    const surpriseContent = document.getElementById('surpriseContent');
    const giftBox = document.querySelector('.gift-box');
    const giftContainer = document.querySelector('.gift-container');
    
    // Add animation
    giftBox.style.transform = 'scale(0.8)';
    giftBox.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
      // Hide gift container so text replaces the box
      if (giftContainer) {
        giftContainer.style.display = 'none';
      }
      surpriseContent.style.display = 'block';
      surpriseContent.style.animation = 'fadeInUp 0.8s ease-out';
    }, 300);
  }

  function celebrateAgain() {
    const surpriseContent = document.getElementById('surpriseContent');
    const giftBox = document.querySelector('.gift-box');
    
    // Hide surprise
    surpriseContent.style.display = 'none';
    
    // Reset gift box
    giftBox.style.transform = 'scale(1)';
    giftBox.style.animation = 'pulse 2s infinite';
  }

  // Floating Elements Animation
  function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    const emojis = ['💕', '🌹', '✨', '💖', '🌸', '💝', '🌺', '💗'];
    
    setInterval(() => {
      const emoji = document.createElement('div');
      emoji.className = 'floating-emoji';
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = Math.random() * 100 + '%';
      emoji.style.top = '100%';
      emoji.style.fontSize = (Math.random() * 2 + 1) + 'rem';
      emoji.style.animation = 'floatUp 8s linear forwards';
      
      container.appendChild(emoji);
      
      // Remove after animation
      setTimeout(() => {
        if (emoji.parentNode) {
          emoji.parentNode.removeChild(emoji);
        }
      }, 8000);
    }, 2000);
  }

  // Smooth scrolling for navigation
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Intersection Observer for animations
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  }

  // Random Shayari Collection
  const shayariCollection = [
    {
      title: "💕 A Note of Love",
      message: "In your smile I find my calm,<br>With you, every moment feels like home."
    },
    {
      title: "🌹 Heartbeat",
      message: "Life feels incomplete without you,<br>With you, every second is whole."
    },
    {
      title: "✨ World of Dreams",
      message: "My dream is to live beside you,<br>My sadness is life without you."
    },
    {
      title: "💖 Our Love Story",
      message: "I lose myself in your eyes,<br>Like stars sinking into moonlit skies."
    },
    {
      title: "🌸 Song of Us",
      message: "I live because of your love,<br>With you, I am truly happy."
    },
    {
      title: "💝 From the Heart",
      message: "Your smile is my greatest gift,<br>It softens every ache I carry."
    },
    {
      title: "🌺 A Little Prayer",
      message: "I whisper a prayer for you each day—<br>may joy always find you."
    },
    {
      title: "💕 Heart’s Whisper",
      message: "With you, every moment sparks anew,<br>And every breath carries your fragrance."
    },
    // Added short English/Hinglish shayari provided by user
    {
      title: "❤️ Forever",
      message: "Forever mine, always yours ❤️"
    },
    {
      title: "💫 Everyday Joy",
      message: "You’re my favorite part of every day 💫"
    },
    {
      title: "💕 Heartbeat",
      message: "My heart beats only for you 💕"
    },
    {
      title: "🌸 Your Smile",
      message: "In your smile, I see my world 🌸"
    },
    {
      title: "🥰 Always Us",
      message: "You + Me = Always 🥰"
    },
    {
      title: "🌹 Always With You",
      message: "Can’t imagine my life without you 🌹"
    },
    {
      title: "✨ Magical",
      message: "Every moment with you feels magical ✨"
    },
    {
      title: "💌 Safe Place",
      message: "My safe place, my home, is you 💌"
    },
    {
      title: "🤝 Together",
      message: "Holding your hand is my happy place 🤝"
    },
    {
      title: "💖 Endless",
      message: "Together, we’re endless 💖"
    }
  ];

  // Get Random Shayari
  function getRandomShayari() {
    const randomIndex = Math.floor(Math.random() * shayariCollection.length);
    return shayariCollection[randomIndex];
  }

  // Control flag to respect manual close
  let popupClosed = false;

  // Notification Popup Functions
  function showNotification() {
    const popup = document.getElementById('notificationPopup');
    const title = document.getElementById('popupTitle');
    const message = document.getElementById('popupMessage');
    
    if (popup && title && message) {
      const randomShayari = getRandomShayari();
      title.innerHTML = randomShayari.title;
      message.innerHTML = randomShayari.message;
      
      popup.style.display = 'block';
      popup.style.animation = 'slideInRight 0.5s ease-out';
      popupClosed = false;
    }
  }

  function closeNotification() {
    const popup = document.getElementById('notificationPopup');
    if (popup) {
      popup.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        popup.style.display = 'none';
        popupClosed = true;
      }, 300);
    }
  }

  // Auto show notification after 2 seconds
  function autoShowNotification() {
    setTimeout(() => {
      showNotification();
    }, 2000);
  }

  // Cycle popup: slide out, swap shayari, slide in
  function cyclePopup() {
    const popup = document.getElementById('notificationPopup');
    const title = document.getElementById('popupTitle');
    const message = document.getElementById('popupMessage');
    if (!popup || !title || !message) return;

    // Slide out
    popup.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      // Swap content while hidden
      const next = getRandomShayari();
      title.innerHTML = next.title;
      message.innerHTML = next.message;

      // Ensure visible and slide in
      popup.style.display = 'block';
      popup.style.animation = 'slideInRight 0.5s ease-out';
    }, 320);
  }

  // Auto refresh shayari with in-out animation every 10 seconds
  function autoRefreshShayari() {
    setInterval(() => {
      if (popupClosed) return; // respect manual close
      const popup = document.getElementById('notificationPopup');
      if (popup) {
        if (popup.style.display === 'none' || popup.style.display === '') {
          // If hidden for any reason, show it first
          showNotification();
        } else {
          cyclePopup();
        }
      }
    }, 10000); // Change every 10 seconds
  }

  // Try to play background music respecting browser autoplay policies
  function tryPlayMusic() {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;
    const play = () => audio.play().catch(() => {/* ignored: autoplay blocked */});
    // Attempt on load
    play();
    // Also resume on first user interaction
    const once = () => { play(); document.removeEventListener('click', once); document.removeEventListener('touchstart', once); };
    document.addEventListener('click', once, { once: true });
    document.addEventListener('touchstart', once, { once: true });
  }

  // Initialize everything when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Initialize other features
    createFloatingElements();
    initSmoothScrolling();
    initScrollAnimations();
    
    // Add some sparkle effects
    addSparkleEffects();
    
    // Show notification popup
    autoShowNotification();
    
    // Start auto refresh shayari
    autoRefreshShayari();

    // Try to play music
    tryPlayMusic();
  });

  // Make functions global
  window.closeNotification = closeNotification;
  window.revealSurprise = revealSurprise;
  window.celebrateAgain = celebrateAgain;

  // Add sparkle effects
  function addSparkleEffects() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.position = 'fixed';
    sparkleContainer.style.top = '0';
    sparkleContainer.style.left = '0';
    sparkleContainer.style.width = '100%';
    sparkleContainer.style.height = '100%';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.zIndex = '1000';
    document.body.appendChild(sparkleContainer);

    setInterval(() => {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = '✨';
      sparkle.style.position = 'absolute';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';
      sparkle.style.animation = 'sparkle 2s ease-out forwards';
      sparkle.style.opacity = '0';
      
      sparkleContainer.appendChild(sparkle);
      
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 2000);
    }, 1000);
  }

  // Add sparkle animation to CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      from {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      to {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    @keyframes sparkle {
      0% {
        opacity: 0;
        transform: scale(0) rotate(0deg);
      }
      50% {
        opacity: 1;
        transform: scale(1) rotate(180deg);
      }
      100% {
        opacity: 0;
        transform: scale(0) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);

})();