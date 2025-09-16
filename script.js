// Global variables
let currentPage = 0;
const pages = ['landing', 'message', 'photos', 'surprise'];

// Simple countdown system
let countdownDays = 28; // Starting countdown

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website initialized');
    // Initialize countdown display
    updateCountdownDisplay();
    
    // Add click event to landing page
    document.getElementById('landing').addEventListener('click', function() {
        showNextPage();
    });
    
    // Add click event to gift box
    const giftBox = document.querySelector('.gift-box');
    if (giftBox) {
        console.log('Gift box found, adding click listener');
        giftBox.addEventListener('click', function() {
            openGift();
        });
    } else {
        console.log('Gift box not found!');
    }
    
    // Initialize background music
    initializeMusic();
    
    // Add some sparkle effects
    createSparkles();
});


// Update countdown display
function updateCountdownDisplay() {
    const countdownElement = document.getElementById('countdownDisplay');
    console.log('Updating countdown display:', countdownDays, 'days');
    if (countdownElement) {
        if (countdownDays > 0) {
            countdownElement.textContent = `✨ ${countdownDays} DAYS TO GO ✨`;
        } else {
            countdownElement.textContent = `✨ THE DAY IS HERE! ✨`;
        }
        console.log('Countdown updated to:', countdownElement.textContent);
    } else {
        console.log('Countdown element not found!');
    }
}


// Initialize background music
function initializeMusic() {
    const music = document.getElementById('backgroundMusic');
    
    // Try to play music (may require user interaction on some browsers)
    music.play().catch(function(error) {
        console.log('Music autoplay prevented:', error);
        // Music will start when user interacts with the page
    });
    
    // Start music on first user interaction
    document.addEventListener('click', function() {
        if (music.paused) {
            music.play().catch(function(error) {
                console.log('Music play failed:', error);
            });
        }
    }, { once: true });
    
    // Ensure music loops continuously
    music.addEventListener('ended', function() {
        music.currentTime = 0;
        music.play().catch(function(error) {
            console.log('Music restart failed:', error);
        });
    });
}

// Show next page function
function showNextPage() {
    if (currentPage < pages.length - 1) {
        // Hide current page
        document.getElementById(pages[currentPage]).classList.remove('active');
        
        // Show next page
        currentPage++;
        document.getElementById(pages[currentPage]).classList.add('active');
        
        // Add entrance animation
        setTimeout(() => {
            const currentPageElement = document.getElementById(pages[currentPage]);
            currentPageElement.style.animation = 'slideInFromRight 0.8s ease-out';
        }, 100);
    }
}

// Show photos page
function showPhotos() {
    // Show r1.jpeg for 5 seconds first
    showImageFor5Seconds();
}

// Function to show r1.jpeg for 5 seconds
function showImageFor5Seconds() {
    // Create overlay for the image
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.animation = 'fadeIn 0.5s ease-in';
    
    // Create image element
    const img = document.createElement('img');
    img.src = 'r1.jpeg';
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '15px';
    img.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
    img.style.animation = 'scaleIn 0.5s ease-out';
    
    // Add image to overlay
    overlay.appendChild(img);
    
    // Add overlay to body
    document.body.appendChild(overlay);
    
    // Remove overlay after 5 seconds and proceed to photos
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            // Now proceed to photos page
            showNextPage();
        }, 500);
    }, 5000);
}

// Show surprise page
function showSurprise() {
    showNextPage();
}

// Open gift box function
function openGift() {
    console.log('Gift box clicked!');
    const giftBox = document.querySelector('.gift-box');
    const surpriseMessage = document.getElementById('surpriseMessage');
    
    // Add open class for animation
    giftBox.classList.add('open');
    
    // Show surprise message after animation
    setTimeout(() => {
        console.log('Showing surprise message');
        surpriseMessage.style.display = 'block';
        
        // Add confetti effect
        createConfetti();
        
        // Add heart explosion
        createHeartExplosion();

        // Update countdown display
        updateCountdownDisplay();
    }, 500);
}

// Create sparkle effects
function createSparkles() {
    const container = document.querySelector('.container');
    
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            createSparkle(container);
        }
    }, 2000);
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkle 2s ease-out forwards';
    
    container.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 2000);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 50);
    }
}

// Create heart explosion
function createHeartExplosion() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '30px';
            heart.style.pointerEvents = 'none';
            heart.style.animation = `heartExplosion ${1 + Math.random() * 2}s ease-out forwards`;
            
            container.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }, i * 100);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
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
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes heartExplosion {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(
                ${Math.random() * 400 - 200}px, 
                ${Math.random() * 400 - 200}px
            ) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Add some romantic music (optional - you can add background music)
function playRomanticMusic() {
    // This is a placeholder - you can add actual music files
    console.log('🎵 Romantic music would play here 🎵');
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        if (currentPage < pages.length - 1) {
            showNextPage();
        }
    }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next page
            if (currentPage < pages.length - 1) {
                showNextPage();
            }
        } else {
            // Swipe right - previous page (optional)
            if (currentPage > 0) {
                showPreviousPage();
            }
        }
    }
}

function showPreviousPage() {
    if (currentPage > 0) {
        // Hide current page
        document.getElementById(pages[currentPage]).classList.remove('active');
        
        // Show previous page
        currentPage--;
        document.getElementById(pages[currentPage]).classList.add('active');
    }
}

// Add some romantic quotes that appear randomly
const romanticQuotes = [
    "You are my sunshine on a cloudy day ☀️",
    "Every moment with you is a treasure 💎",
    "You make my heart skip a beat 💓",
    "I love you more than words can say 💕",
    "You are my favorite hello and hardest goodbye 👋",
    "In your eyes, I found my home 🏠",
    "You are the reason I believe in love ❤️"
];

function showRandomQuote() {
    if (Math.random() < 0.1) { // 10% chance
        const quote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
        const quoteElement = document.createElement('div');
        quoteElement.textContent = quote;
        quoteElement.style.position = 'fixed';
        quoteElement.style.top = '20px';
        quoteElement.style.right = '20px';
        quoteElement.style.background = 'rgba(255, 255, 255, 0.9)';
        quoteElement.style.padding = '10px 20px';
        quoteElement.style.borderRadius = '20px';
        quoteElement.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        quoteElement.style.zIndex = '1000';
        quoteElement.style.animation = 'fadeInOut 3s ease-in-out';
        
        document.body.appendChild(quoteElement);
        
        setTimeout(() => {
            if (quoteElement.parentNode) {
                quoteElement.parentNode.removeChild(quoteElement);
            }
        }, 3000);
    }
}

// Show random quotes occasionally
setInterval(showRandomQuote, 10000); // Every 10 seconds

// Add fade in/out animation for quotes
const quoteStyle = document.createElement('style');
quoteStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(100%); }
        20% { opacity: 1; transform: translateX(0); }
        80% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(quoteStyle);
