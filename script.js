// Global variables
let currentPage = 0;
const pages = ['landing', 'message', 'photos', 'surprise'];

// Countdown system
let countdownDays = 29; // Starting countdown
const COUNTDOWN_KEY = 'romantic_countdown';
const LAST_UPDATE_KEY = 'last_countdown_update';

// Daily Shayari list (29)
const dailyShayaris = [
    "Teri muskaan mein kuch aisa asar hai,\nDil ye mera har dard se bekhabar hai.",
    "Musaafir hoon tere khwabon ka main,\nManzil bhi tu, raasta bhi tu hi.",
    "Nafrat kam hogi agar pyaar badhao,\nZindagi aasaan hai bas dil se nibhao.",
    "Teri yaadein bhi ab mere saath chalti hain,\nJaise parchhaai har kadam par rehti hai.",
    "Waqt badalta hai sab kuch badal deta hai,\nPar saccha pyaar dil mein jagah bana deta hai.",
    "Chaand sa chehra, sitaron si aankhein,\nTu hi likhe har sher mein meri baatein.",
    "Door rehkar bhi tu paas lagta hai,\nTeri yaadon ka hi jaadu sa chalta hai.",
    "Har khushi tere naam kar doon,\nBas tu keh de main apna kar doon.",
    "Dil ki kitaab mein naam bas tera hai,\nTu hi mera sapna, tu hi savera hai.",
    "Judaai mein bhi tu mera reh jaata hai,\nDil toot kar bhi tujhse pyaar kar jaata hai.",
    "Sapno mein roz tera chehra aata hai,\nTeri mohabbat ka asar gehra jaata hai.",
    "Tanhaai mein bhi tera saath lagta hai,\nTera naam hothon par aa jaata hai.",
    "Teri hansi mein meri duniya basti hai,\nTeri khushiyon se hi meri khushi banti hai.",
    "Teri aankhon mein jo dooba hoon main,\nAb lautna mumkin nahin lagta hai.",
    "Pal do pal ka nahin ye rishta hamara,\nSaanson se bhi gehra hai wada hamara.",
    "Tere bina ye dil adhoora lagta hai,\nTere hone se hi sab poora lagta hai.",
    "Kabhi khushboo, kabhi yaad ban jaata hai,\nTera ehsaas har pal saath nibhaata hai.",
    "Chup rehkar bhi bahut kuch keh jaate ho,\nNazron se apne dil ko choo jaate ho.",
    "Hamari dosti samandar se gehri hai,\nHar lehar mein bas teri hi pehri hai.",
    "Dosti mein bhi ek roohani sa rang hai,\nYe dilon ka rishta hi sabse sang hai.",
    "Wo pehli nazar, wo pehli mulaqat,\nDil ne kaha yahi hai meri saugaat.",
    "Mohabbat mein tera naam amar kar doon,\nSaanson mein tujhe umar bhar bhar loon.",
    "Aankhon mein tera khwab basaya hai,\nDil ne tujhko hi apna bataya hai.",
    "Tera gussa bhi kitna pyaara lagta hai,\nDil ko tera hi sahaara lagta hai.",
    "Safar mein tera haath agar saath ho,\nHar raasta phir mera aasaan ho.",
    "Tere bina koi khushi poori nahin,\nTeri mohabbat ke bina duniya adhoori sahi.",
    "Teri hansi ka jaadu dil ko choo jaata hai,\nHar gham pal bhar mein mit jaata hai.",
    "Teri yaadon ke sahaare jeete hain hum,\nTere bina bhi tujhse hi milte hain hum.",
    "Tere ishq ki lehar mein beh gaya hoon,\nAb tera hi hokar reh gaya hoon."
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown system
    initializeCountdown();
    // Initialize shayari display
    updateDailyShayari();
    
    // Add click event to landing page
    document.getElementById('landing').addEventListener('click', function() {
        showNextPage();
    });
    
    // Add click event to gift box
    document.querySelector('.gift-box').addEventListener('click', function() {
        openGift();
    });
    
    // Initialize background music
    initializeMusic();
    
    // Add some sparkle effects
    createSparkles();
});

// Initialize countdown system
function initializeCountdown() {
    // Get today's date
    const today = new Date();
    const todayString = today.toDateString();
    
    // Get stored data
    const storedCountdown = localStorage.getItem(COUNTDOWN_KEY);
    const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY);
    
    if (storedCountdown && lastUpdate) {
        // Check if it's a new day
        if (lastUpdate !== todayString) {
            // Decrease countdown by 1
            countdownDays = Math.max(0, parseInt(storedCountdown) - 1);
            localStorage.setItem(COUNTDOWN_KEY, countdownDays.toString());
            localStorage.setItem(LAST_UPDATE_KEY, todayString);
        } else {
            // Same day, use stored value
            countdownDays = parseInt(storedCountdown);
        }
    } else {
        // First time, initialize with starting value
        countdownDays = 29;
        localStorage.setItem(COUNTDOWN_KEY, countdownDays.toString());
        localStorage.setItem(LAST_UPDATE_KEY, todayString);
    }
    
    // Update the display
    updateCountdownDisplay();
}

// Update countdown display
function updateCountdownDisplay() {
    const countdownElement = document.getElementById('countdownDisplay');
    if (countdownElement) {
        if (countdownDays > 0) {
            countdownElement.textContent = `✨ ${countdownDays} DAYS TO GO ✨`;
        } else {
            countdownElement.textContent = `✨ THE DAY IS HERE! ✨`;
        }
    }
}

// Reset countdown (for testing or manual reset)
function resetCountdown() {
    countdownDays = 29;
    localStorage.setItem(COUNTDOWN_KEY, countdownDays.toString());
    localStorage.setItem(LAST_UPDATE_KEY, new Date().toDateString());
    updateCountdownDisplay();
    updateDailyShayari();
}

// Get current countdown value
function getCurrentCountdown() {
    return countdownDays;
}

// Update shayari based on remaining days (maps 29..1 to indices 0..28)
function updateDailyShayari() {
    const el = document.getElementById('dailyShayari');
    if (!el) return;
    const total = dailyShayaris.length; // 29
    // If countdownDays is 0, show last shayari or a special line
    if (countdownDays <= 0) {
        el.textContent = dailyShayaris[total - 1];
        return;
    }
    // Map countdownDays (29..1) to index (0..28)
    const index = Math.max(0, Math.min(total - 1, total - countdownDays));
    el.textContent = dailyShayaris[index];
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
    showNextPage();
}

// Show surprise page
function showSurprise() {
    showNextPage();
}

// Open gift box function
function openGift() {
    const giftBox = document.querySelector('.gift-box');
    const surpriseMessage = document.getElementById('surpriseMessage');
    
    // Add open class for animation
    giftBox.classList.add('open');
    
    // Show surprise message after animation
    setTimeout(() => {
        surpriseMessage.style.display = 'block';
        
        // Add confetti effect
        createConfetti();
        
        // Add heart explosion
        createHeartExplosion();

        // Ensure shayari and countdown are up to date when opening
        updateCountdownDisplay();
        updateDailyShayari();
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
