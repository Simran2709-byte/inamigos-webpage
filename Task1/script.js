document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFormHandling();
    initScrollAnimations();
    initSmoothScroll();
    initInteractiveElements();
});

/* ============================================
   MOBILE MENU HANDLING
   ============================================ */

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/* ============================================
   FORM HANDLING & VALIDATION
   ============================================ */

function initFormHandling() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous errors
            clearFormErrors();

            // Get form data
            const formData = {
                name: contactForm.querySelector('input[type="text"]').value.trim(),
                email: contactForm.querySelector('input[type="email"]').value.trim(),
                message: contactForm.querySelector('textarea').value.trim()
            };

            // Validate form
            let isValid = true;

            if (!formData.name) {
                showFieldError(contactForm.querySelector('input[type="text"]'), 'Please enter your name');
                isValid = false;
            }

            if (!formData.email) {
                showFieldError(contactForm.querySelector('input[type="email"]'), 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(formData.email)) {
                showFieldError(contactForm.querySelector('input[type="email"]'), 'Please enter a valid email');
                isValid = false;
            }

            if (!formData.message) {
                showFieldError(contactForm.querySelector('textarea'), 'Please enter your message');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                showToast('Thank you! We will get back to you soon.', 'success');

                // Simulate form submission
                const button = contactForm.querySelector('button[type="submit"]');
                const originalText = button.innerHTML;
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = originalText;
                    contactForm.reset();
                }, 2000);
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('focus', function() {
                clearFieldError(this);
            });
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateField(field) {
    const parent = field.parentElement;
    const errorSpan = parent.querySelector('.form-error');

    if (!errorSpan) return;

    if (field.type === 'email') {
        if (!field.value) {
            showFieldError(field, 'Email is required');
        } else if (!isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email');
        }
    } else if (field.tagName === 'TEXTAREA' || field.type === 'text') {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
        }
    }
}

function showFieldError(field, message) {
    const parent = field.parentElement;
    const errorSpan = parent.querySelector('.form-error');

    field.style.borderColor = '#f44336';
    field.style.backgroundColor = 'rgba(244, 67, 54, 0.05)';

    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

function clearFieldError(field) {
    const parent = field.parentElement;
    const errorSpan = parent.querySelector('.form-error');

    field.style.borderColor = '';
    field.style.backgroundColor = '';

    if (errorSpan) {
        errorSpan.textContent = '';
    }
}

function clearFormErrors() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.querySelectorAll('.form-input').forEach(input => {
            clearFieldError(input);
        });
    }
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');

    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    // Auto-hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const elementsToAnimate = document.querySelectorAll(
        '.mission-card, .project-card, .impact-card, .highlight-card, ' +
        '.involvement-card, .gallery-item'
    );

    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Update navbar on scroll
    updateNavbarOnScroll();
}

function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '';
        }
    });
}

/* ============================================
   INTERACTIVE ELEMENTS
   ============================================ */

function initInteractiveElements() {
    // Button ripple effect
    initButtonRipple();

    // Card hover effects
    initCardHovers();

    // Counter animation
    initCounterAnimation();

    // Gallery interaction
    initGalleryInteraction();
}

/* Button Ripple Effect */
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;

            // Add ripple animation if not already in style
            if (!document.querySelector('style[data-ripple]')) {
                const style = document.createElement('style');
                style.setAttribute('data-ripple', 'true');
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/* Card Hover Effects */
function initCardHovers() {
    const cards = document.querySelectorAll(
        '.project-card, .highlight-card, .involvement-card, .mission-card'
    );

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/* Counter Animation */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.impact-number');

    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter(counter);
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

function animateCounter(counter) {
    const text = counter.textContent;
    const number = parseInt(text.match(/\d+/)[0]);
    const increment = Math.ceil(number / 30);
    let current = 0;

    const interval = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(interval);
        }
        counter.innerHTML = current.toLocaleString() + '<span class="plus">+</span>';
    }, 50);
}

/* Gallery Interaction */
function initGalleryInteraction() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Add click interaction
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                showImageModal(img.src, img.alt);
            }
        });
    });
}

function showImageModal(src, alt) {
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 8px;
        animation: slideIn 0.3s ease;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;

    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.3)';
        this.style.transform = 'scale(1.1)';
    });

    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.transform = 'scale(1)';
    });

    closeBtn.addEventListener('click', function() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });

    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);

    // Add animations if not already defined
    if (!document.querySelector('style[data-modal]')) {
        const style = document.createElement('style');
        style.setAttribute('data-modal', 'true');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Get current active section
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    return current;
}

// Update active nav link
window.addEventListener('scroll', function() {
    const current = getCurrentSection();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ============================================
   PRELOAD IMAGES
   ============================================ */

window.addEventListener('load', function() {
    // Preload project and gallery images
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });
});

/* ============================================
   ACCESSIBILITY
   ============================================ */

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        const modals = document.querySelectorAll('[style*="fixed"]');
        modals.forEach(modal => {
            if (modal.style.background && modal.style.background.includes('rgba')) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }
});

// Log initialization
console.log('InAmigos Foundation - Ultimate Website Loaded ✓');