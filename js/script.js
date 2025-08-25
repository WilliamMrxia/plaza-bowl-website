// JavaScript for Plaza Bowl website - Carousel functionality and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousels
    initBowlingCarousel();
    initHeroBackground();
    
    // Smooth scrolling for navigation
    initSmoothScrolling();
    
    // Lazy loading for images
    initLazyLoading();
});

// Bowling Carousel Functionality
function initBowlingCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    
    let currentSlide = 0;
    let autoPlayInterval;

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = carousel.querySelectorAll('.carousel-indicator');

    function goToSlide(index) {
        // Remove active classes
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active classes
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Pause auto-play when hovering over carousel
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide(); // Swipe left
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide(); // Swipe right
        }
    }

    // Start auto-play
    startAutoPlay();
}

// Hero Background Slideshow
function initHeroBackground() {
    const heroBackgrounds = document.querySelectorAll('.hero-bg');
    if (heroBackgrounds.length < 2) return;

    let currentBg = 0;
    const bgInterval = setInterval(() => {
        heroBackgrounds[currentBg].classList.remove('active');
        currentBg = (currentBg + 1) % heroBackgrounds.length;
        heroBackgrounds[currentBg].classList.add('active');
    }, 6000); // Change background every 6 seconds
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Image Zoom Effect
function initImageZoom() {
    const images = document.querySelectorAll('.content-images img, .carousel-slide img');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    });
}

// Initialize image zoom after page load
window.addEventListener('load', initImageZoom);

// Responsive Navigation for Mobile
function initMobileNavigation() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const menuToggle = document.createElement('button');
    
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    header.appendChild(menuToggle);

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Initialize mobile navigation
initMobileNavigation();

// Add loading animation for images
function addLoadingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        img {
            transition: opacity 0.3s ease;
        }
        
        img:not([src]) {
            opacity: 0;
        }
        
        img[src] {
            opacity: 1;
        }
        
        .loading {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    `;
    document.head.appendChild(style);
}

addLoadingAnimation();
