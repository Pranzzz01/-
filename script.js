// Modern JavaScript for Enhanced Love Website
class LoveWebsite {
    constructor() {
        this.currentSection = 0;
        this.sections = ['hero', 'letter', 'gallery', 'countdown', 'surprise'];
        this.isScrolling = false;
        // Set countdown target to October 14, 2025
        this.countdownTarget = new Date('October 14, 2025 00:00:00').getTime();
        this.music = null;
        this.isMusicPlaying = false;
        this.photoIndex = 0;
        this.photos = ['a1.jpeg', 'a2.jpeg', 'a3.jpeg'];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeMusic();
        this.setupCountdown();
        this.setupTypingEffect();
        this.setupScrollAnimations();
        this.setupParticleSystem();
        this.setCurrentDate();
        this.animateLetterText();
        this.setupGallery();
        this.createFloatingElements();
        this.setupBackToTop();
        this.setupPersonalization();
    }

    setupEventListeners() {
        // Navigation dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSection(index));
        });

        // Gift box click
        const giftBox = document.getElementById('giftBox');
        if (giftBox) {
            giftBox.addEventListener('click', () => this.openGift());
        }

        // Celebrate again
        const celebrateAgain = document.getElementById('celebrateAgain');
        if (celebrateAgain) {
            celebrateAgain.addEventListener('click', () => {
                this.createConfetti();
                this.createHeartExplosion();
            });
        }

        // Back to top
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }

        // Music toggle
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) {
            musicToggle.addEventListener('click', () => this.toggleMusic(musicToggle));
        }

        // Gallery controls
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousPhoto());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextPhoto());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Touch/swipe support
        this.setupTouchEvents();

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());

        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    setupTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const text = typingText.textContent;
        typingText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Start cursor blinking
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.animation = 'blink 1s infinite';
                }
            }
        };

        setTimeout(typeWriter, 1000);
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Update navigation dots
                    const sectionId = entry.target.id;
                    const sectionIndex = this.sections.indexOf(sectionId);
                    if (sectionIndex !== -1) {
                        this.updateNavigationDots(sectionIndex);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                observer.observe(section);
            }
        });
    }

    setupParticleSystem() {
        const particlesContainer = document.querySelector('.floating-particles');
        if (!particlesContainer) return;

        // Create additional floating particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createParticle(particlesContainer);
            }, i * 200);
        }

        // Continue creating particles
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createParticle(particlesContainer);
            }
        }, 3000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: 100%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 15}s linear forwards;
        `;

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }

    setupCountdown() {
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.countdownTarget - now;

        if (distance < 0) {
            // Countdown finished - The day has arrived!
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Update countdown message
            const countdownMessage = document.querySelector('.countdown-message p');
            if (countdownMessage) {
                countdownMessage.textContent = '🎉 The day has finally arrived! 🎉';
            }
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

        // Add pulse animation to changing numbers
        this.animateCountdownNumber('days', days);
        this.animateCountdownNumber('hours', hours);
        this.animateCountdownNumber('minutes', minutes);
        this.animateCountdownNumber('seconds', seconds);
    }

    updateSurpriseCountdown() {
        const now = new Date().getTime();
        const distance = this.countdownTarget - now;
        
        if (distance < 0) {
            const surpriseCountdown = document.getElementById('surpriseCountdown');
            if (surpriseCountdown) {
                surpriseCountdown.textContent = '0';
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const surpriseCountdown = document.getElementById('surpriseCountdown');
        if (surpriseCountdown) {
            surpriseCountdown.textContent = days.toString();
        }
    }

    animateCountdownNumber(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.transform = 'scale(1.2)';
            element.style.color = '#ff6b6b';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 200);
        }
    }

    setupGallery() {
        const photoCards = document.querySelectorAll('.photo-card');
        photoCards.forEach((card, index) => {
            card.addEventListener('click', () => this.showPhotoModal(index));
        });
    }

    showPhotoModal(index) {
        const photoSrc = this.photos[index];
        const modal = document.createElement('div');
        modal.className = 'photo-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <img src="${photoSrc}" alt="Beautiful Memory" class="modal-photo">
                    <div class="modal-caption">Beautiful Memory ${index + 1}</div>
                </div>
            </div>
        `;

        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        document.body.appendChild(modal);

        // Close modal events
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeModal(modal);
        });

        // Keyboard close
        const handleKeyClose = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
                document.removeEventListener('keydown', handleKeyClose);
            }
        };
        document.addEventListener('keydown', handleKeyClose);
    }

    closeModal(modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    previousPhoto() {
        this.photoIndex = (this.photoIndex - 1 + this.photos.length) % this.photos.length;
        this.updateGalleryDisplay();
    }

    nextPhoto() {
        this.photoIndex = (this.photoIndex + 1) % this.photos.length;
        this.updateGalleryDisplay();
    }

    updateGalleryDisplay() {
        const photoCards = document.querySelectorAll('.photo-card');
        photoCards.forEach((card, index) => {
            if (index === this.photoIndex) {
                card.style.transform = 'scale(1.05)';
                card.style.zIndex = '10';
            } else {
                card.style.transform = 'scale(1)';
                card.style.zIndex = '1';
            }
        });
    }

    animateLetterText() {
        const letterTexts = document.querySelectorAll('.letter-text');
        letterTexts.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('animate-text');
            }, index * 500);
        });
    }

    setCurrentDate() {
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            const today = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            dateElement.textContent = today.toLocaleDateString('en-US', options);
        }
    }

    initializeMusic() {
        this.music = document.getElementById('backgroundMusic');
        if (!this.music) return;

        // Try to play music (may require user interaction)
        this.music.play().catch(() => {
            console.log('Music autoplay prevented');
        });

        // Start music on first user interaction
        const startMusic = () => {
            if (this.music && this.music.paused) {
                this.music.play().then(() => {
                    this.isMusicPlaying = true;
                }).catch(() => {
                    console.log('Music play failed');
                });
            }
            document.removeEventListener('click', startMusic);
            document.removeEventListener('touchstart', startMusic);
        };

        document.addEventListener('click', startMusic);
        document.addEventListener('touchstart', startMusic);
    }

    toggleMusic(button) {
        if (!this.music) return;
        if (this.music.paused) {
            this.music.play();
            this.isMusicPlaying = true;
            button.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            this.music.pause();
            this.isMusicPlaying = false;
            button.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    }

    openGift() {
        const giftBox = document.getElementById('giftBox');
        const surpriseReveal = document.getElementById('surpriseReveal');
        
        if (!giftBox || !surpriseReveal) return;

        // Add open animation
        giftBox.classList.add('open');

        // Show surprise after animation
        setTimeout(() => {
            surpriseReveal.classList.add('show');
            this.createConfetti();
            this.createHeartExplosion();
            this.updateSurpriseCountdown();
        }, 500);
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;
        const toggleBtn = () => {
            if (window.scrollY > window.innerHeight * 0.7) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        };
        window.addEventListener('scroll', toggleBtn);
        toggleBtn();
    }

    setupPersonalization() {
        const storedName = localStorage.getItem('recipientName');
        if (storedName) {
            this.applyRecipientName(storedName);
            return;
        }
        setTimeout(() => {
            const name = prompt('Whom is this for? Enter a name (e.g., Rose):');
            if (name && name.trim()) {
                const clean = name.trim();
                localStorage.setItem('recipientName', clean);
                this.applyRecipientName(clean);
            }
        }, 1200);
    }

    applyRecipientName(name) {
        const el1 = document.getElementById('recipientName');
        const el2 = document.getElementById('recipientName2');
        if (el1) el1.textContent = name;
        if (el2) el2.textContent = name;
    }

    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const container = document.querySelector('.main-container');
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}%;
                    top: -10px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                `;
                
                container.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 20);
        }
    }

    createHeartExplosion() {
        const container = document.querySelector('.main-container');
        const hearts = ['💕', '💖', '💗', '💝', '💘', '💞', '💓', '💟'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.cssText = `
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    font-size: 30px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: heartExplosion ${1 + Math.random() * 2}s ease-out forwards;
                `;
                
                container.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 3000);
            }, i * 50);
        }
    }

    createFloatingElements() {
        const container = document.querySelector('.main-container');
        
        setInterval(() => {
            if (Math.random() < 0.2) {
                this.createFloatingHeart(container);
            }
        }, 2000);
    }

    createFloatingHeart(container) {
        const heart = document.createElement('div');
        const hearts = ['💕', '💖', '💗', '💝', '💘', '💞', '💓', '💟', '🌹', '✨', '🌸'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: 100%;
            font-size: ${Math.random() * 20 + 15}px;
            pointer-events: none;
            z-index: 100;
            animation: floatHeart ${Math.random() * 10 + 10}s linear forwards;
            opacity: 0.8;
        `;
        
        container.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 20000);
    }

    goToSection(index) {
        if (index < 0 || index >= this.sections.length) return;
        
        const section = document.getElementById(this.sections[index]);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    updateNavigationDots(activeIndex) {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                this.nextSection();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.previousSection();
                break;
        }
    }

    nextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.currentSection++;
            this.goToSection(this.currentSection);
        }
    }

    previousSection() {
        if (this.currentSection > 0) {
            this.currentSection--;
            this.goToSection(this.currentSection);
        }
    }

    setupTouchEvents() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        let touchStartTime = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            touchStartTime = Date.now();
            
            // Prevent default to avoid scrolling issues on mobile
            if (e.target.closest('.photo-card') || e.target.closest('.gift-box')) {
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            const touchDuration = Date.now() - touchStartTime;
            
            // Only handle swipe if touch duration is reasonable (not a long press)
            if (touchDuration < 500) {
                this.handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
            }
        });

        // Add touch feedback for interactive elements
        document.addEventListener('touchstart', (e) => {
            if (e.target.closest('.gallery-btn, .music-btn, .gift-box')) {
                e.target.style.transform = 'scale(0.95)';
            }
        });

        document.addEventListener('touchend', (e) => {
            if (e.target.closest('.gallery-btn, .music-btn, .gift-box')) {
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 150);
            }
        });
    }

    handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe right - previous section
                    this.previousSection();
                } else {
                    // Swipe left - next section
                    this.nextSection();
                }
            }
        } else {
            // Vertical swipe
            if (Math.abs(deltaY) > minSwipeDistance) {
                if (deltaY > 0) {
                    // Swipe down - previous section
                    this.previousSection();
                } else {
                    // Swipe up - next section
                    this.nextSection();
                }
            }
        }
    }

    handleScroll() {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        setTimeout(() => {
            this.isScrolling = false;
        }, 100);
    }

    handleResize() {
        // Handle responsive adjustments
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Mobile-specific adjustments
        if (window.innerWidth <= 768) {
            this.optimizeForMobile();
        }
    }

    optimizeForMobile() {
        // Reduce animation complexity on mobile for better performance
        const floatingHearts = document.querySelectorAll('.heart-emoji');
        floatingHearts.forEach(heart => {
            heart.style.animationDuration = '20s'; // Slower animation for better performance
        });

        // Optimize particle system for mobile
        const particles = document.querySelectorAll('.particle');
        if (particles.length > 10) {
            // Remove excess particles on mobile
            for (let i = 10; i < particles.length; i++) {
                if (particles[i].parentNode) {
                    particles[i].parentNode.removeChild(particles[i]);
                }
            }
        }
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes floatHeart {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.8;
        }
        90% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .photo-modal .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        animation: scaleIn 0.3s ease;
    }
    
    .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10001;
    }
    
    .modal-photo {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    
    .modal-caption {
        color: white;
        text-align: center;
        margin-top: 20px;
        font-size: 1.2rem;
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

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoveWebsite();
});

// Add some romantic quotes that appear randomly
const romanticQuotes = [
    "You are my sunshine on a cloudy day ☀️",
    "Every moment with you is a treasure 💎",
    "You make my heart skip a beat 💓",
    "I love you more than words can say 💕",
    "You are my favorite hello and hardest goodbye 👋",
    "In your eyes, I found my home 🏠",
    "You are the reason I believe in love ❤️",
    "Your smile is my favorite thing 🌟",
    "You complete my world 🌍",
    "Forever and always, my love 💖"
];

function showRandomQuote() {
    if (Math.random() < 0.1) { // 10% chance
        const quote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
        const quoteElement = document.createElement('div');
        quoteElement.textContent = quote;
        quoteElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            padding: 15px 25px;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInQuote 3s ease-in-out;
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            color: #2c3e50;
            max-width: 300px;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(quoteElement);
        
        setTimeout(() => {
            if (quoteElement.parentNode) {
                quoteElement.parentNode.removeChild(quoteElement);
            }
        }, 3000);
    }
}

// Show random quotes occasionally
setInterval(showRandomQuote, 15000); // Every 15 seconds

// Add quote animation
const quoteStyle = document.createElement('style');
quoteStyle.textContent = `
    @keyframes slideInQuote {
        0% { 
            opacity: 0; 
            transform: translateX(100%); 
        }
        20% { 
            opacity: 1; 
            transform: translateX(0); 
        }
        80% { 
            opacity: 1; 
            transform: translateX(0); 
        }
        100% { 
            opacity: 0; 
            transform: translateX(100%); 
        }
    }
`;
document.head.appendChild(quoteStyle);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);