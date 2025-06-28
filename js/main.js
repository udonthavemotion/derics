/**
 * Derik's Party Buses - Main JavaScript File
 * Handles navigation, mobile menu, and general website functionality
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎭 Wheelz Of Fadez - Website initialized');
    
    // Initialize navigation
    initNavigation();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize active navigation
    initActiveNavigation();
    
    // Initialize form validation (if forms exist)
    initFormValidation();
    
    // Initialize hero video
    initHeroVideo();
    
    // Add scroll effects
    initScrollEffects();
    
    // Initialize loading spinners
    initLoadingSpinners();
});

/**
 * Mobile Menu Functionality
 * Toggles the mobile navigation menu when hamburger is clicked
 */
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            // Toggle hamburger animation
            mobileMenu.classList.toggle('active');
            
            // Toggle menu visibility
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a nav link (mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
        
        // Close menu when clicking outside (mobile)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !mobileMenu.contains(e.target) && 
                !navMenu.contains(e.target) &&
                navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

/**
 * Smooth Scrolling for Anchor Links
 * Adds smooth scrolling behavior to internal links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Active Navigation Highlighting
 * Updates navigation active state based on scroll position
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
}

/**
 * Scroll Effects
 * Handles header transparency and scroll-to-top functionality
 */
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        // Header background opacity based on scroll
        if (scrollPosition > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Scroll to top functionality
    createScrollToTopButton();
}

/**
 * Creates a scroll-to-top button
 */
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        box-shadow: var(--shadow-medium);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Form Validation
 * Basic form validation for contact forms
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const formData = new FormData(form);
            let isValid = true;
            let errorMessage = '';
            
            // Basic validation
            for (let [key, value] of formData.entries()) {
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = `Please fill in the ${key} field.`;
                    break;
                }
                
                // Email validation
                if (key === 'email' && !isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                    break;
                }
                
                // Phone validation
                if (key === 'phone' && !isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number.';
                    break;
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                showAlert(errorMessage, 'error');
            }
        });
    });
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone validation helper
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    return phoneRegex.test(phone);
}

/**
 * Show Alert Messages
 * Displays success/error messages to users
 */
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            <span>${message}</span>
            <button class="alert-close">&times;</button>
        </div>
    `;
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        background: ${type === 'error' ? '#E74C3C' : '#27AE60'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
    
    // Manual close button
    const closeButton = alert.querySelector('.alert-close');
    closeButton.addEventListener('click', () => {
        alert.remove();
    });
}

/**
 * Loading Spinners
 * Shows loading indicators for async operations
 */
function initLoadingSpinners() {
    // This will be used in other pages for booking forms, etc.
    window.showLoading = function(element) {
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        spinner.style.cssText = `
            margin: 20px auto;
            display: block;
        `;
        
        if (element) {
            element.appendChild(spinner);
        }
        
        return spinner;
    };
    
    window.hideLoading = function(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.remove();
        }
    };
}

/**
 * Utility Functions
 */

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format phone number
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other files
window.PartyBusUtils = {
    formatCurrency,
    formatPhone,
    showAlert,
    debounce
};

// Console message for developers
console.log(`
🎭 Wheelz Of Fadez - Louisiana's Premier Party Experience
📱 Mobile responsive design with Mardi Gras vibes
✨ Modern JavaScript functionality
🎉 Laissez les bons temps rouler!
`);

/**
 * Initialize hero video functionality
 */
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    const videoContainer = document.querySelector('.hero-video-container');
    
    if (heroVideo && videoContainer) {
        console.log('🎬 Initializing hero video...');
        
        // Ensure video properties are set
        heroVideo.muted = true;
        heroVideo.autoplay = true;
        heroVideo.loop = true;
        heroVideo.playsInline = true;
        heroVideo.preload = 'metadata';
        
        // Add loading indicator
        const loadingOverlay = document.createElement('div');
        loadingOverlay.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10;
            font-family: var(--font-family);
        `;
        loadingOverlay.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading video...';
        videoContainer.appendChild(loadingOverlay);
        
        // Add event listeners
        heroVideo.addEventListener('loadstart', function() {
            console.log('🎬 Hero video loading started');
        });
        
        heroVideo.addEventListener('loadedmetadata', function() {
            console.log('🎬 Hero video metadata loaded');
            console.log('Video duration:', this.duration);
            console.log('Video dimensions:', this.videoWidth, 'x', this.videoHeight);
        });
        
        heroVideo.addEventListener('canplay', function() {
            console.log('🎬 Hero video can start playing');
            // Remove loading overlay
            if (loadingOverlay.parentNode) {
                loadingOverlay.remove();
            }
            
            // Force play if not already playing
            this.play().catch(function(error) {
                console.log('🎬 Video autoplay failed:', error);
                // Try to play on user interaction
                document.addEventListener('click', function() {
                    heroVideo.play();
                }, { once: true });
            });
        });
        
        heroVideo.addEventListener('playing', function() {
            console.log('🎬 Hero video is now playing');
            // Ensure video is visible
            videoContainer.style.opacity = '1';
            this.style.opacity = '1';
        });
        
        heroVideo.addEventListener('error', function(e) {
            console.warn('🎬 Hero video error:', e);
            console.warn('Video error details:', this.error);
            
            // Remove loading overlay
            if (loadingOverlay.parentNode) {
                loadingOverlay.remove();
            }
            
            // Show error message
            const errorOverlay = document.createElement('div');
            errorOverlay.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(220, 53, 69, 0.9);
                color: white;
                padding: 20px;
                border-radius: 10px;
                z-index: 10;
                text-align: center;
                font-family: var(--font-family);
            `;
            errorOverlay.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i><br>
                Video failed to load<br>
                <small>Using fallback background</small>
            `;
            videoContainer.appendChild(errorOverlay);
            
            // Hide error after 3 seconds
            setTimeout(() => {
                if (errorOverlay.parentNode) {
                    errorOverlay.remove();
                }
            }, 3000);
        });
        
        heroVideo.addEventListener('stalled', function() {
            console.log('🎬 Video stalled, network might be slow');
        });
        
        heroVideo.addEventListener('waiting', function() {
            console.log('🎬 Video waiting for more data');
        });
        
        // Try to play immediately
        heroVideo.play().catch(function(error) {
            console.log('🎬 Initial video play failed, will retry when ready:', error);
        });
        
        // Fallback: try to play after a short delay
        setTimeout(() => {
            if (heroVideo.paused) {
                console.log('🎬 Attempting delayed video play...');
                heroVideo.play().catch(function(error) {
                    console.log('🎬 Delayed play also failed:', error);
                });
            }
        }, 1000);
        
    } else {
        console.warn('🎬 Hero video element not found');
    }
} 