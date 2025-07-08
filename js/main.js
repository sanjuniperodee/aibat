// Document Ready
document.addEventListener('DOMContentLoaded', function() {
    // Page Loading Animation
    document.body.classList.add('loaded');
    
    // Initialize Swiper for Hero Section
    const heroSwiper = new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.hero-slider .swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },
        navigation: {
            nextEl: '.hero-slider .swiper-button-next',
            prevEl: '.hero-slider .swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        grabCursor: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        lazy: {
            loadPrevNext: true,
        },
    });
    
    // Initialize Swiper for Nursery Section
    const nurserySwiper = new Swiper('.nursery-slider', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.nursery-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.nursery-slider .swiper-button-next',
            prevEl: '.nursery-slider .swiper-button-prev',
        },
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 800,
        grabCursor: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        lazy: {
            loadPrevNext: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 1,
                spaceBetween: 30,
            }
        },
        on: {
            init: function() {
                // Customize navigation buttons
                const nextButton = document.querySelector('.nursery-slider .swiper-button-next');
                const prevButton = document.querySelector('.nursery-slider .swiper-button-prev');
                
                if (nextButton && prevButton) {
                    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
                    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
                }
            }
        }
    });
    
    // Scroll Animation
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 90)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initial check for elements in view
    handleScrollAnimation();
    
    // About section animation
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.classList.add('loaded');
    }
    
    // Mobile Menu Toggle
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) {
        const newBackToTopButton = document.createElement('div');
        newBackToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        newBackToTopButton.classList.add('back-to-top');
        document.body.appendChild(newBackToTopButton);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                newBackToTopButton.classList.add('show');
            } else {
                newBackToTopButton.classList.remove('show');
            }
        });
        
        newBackToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Documents Lightbox
    const documentItems = document.querySelectorAll('.document-item');
    documentItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navbarMenu && navbarMenu.classList.contains('active')) {
                    navbarToggle.classList.remove('active');
                    navbarMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            // Basic validation
            if (!formValues.name || !formValues.email || !formValues.phone || !formValues.message) {
                alert('Пожалуйста, заполните все поля формы');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formValues.email)) {
                alert('Пожалуйста, введите корректный email');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(formValues.phone)) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }
            
            // Show success message (in a real application, you would send the data to a server)
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Спасибо за ваше сообщение!</h3>
                <p>Мы свяжемся с вами в ближайшее время.</p>
            `;
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        });
    }

    // Initialize Animations
    initAnimations();
    
    // Performance optimizations
    optimizePerformance();
    
    // Fix any unexpected images
    cleanupUnexpectedImages();

    // Gallery Lightbox for service and project pages
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });

    // Add mobile menu functionality for sub-pages
    const currentPath = window.location.pathname;
    if (currentPath.includes('/services/') || currentPath.includes('/projects/')) {
        // Update active nav link based on current page
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (currentPath.includes('/services/') && link.getAttribute('href').includes('#services')) {
                link.classList.add('active');
            } else if (currentPath.includes('/projects/') && link.getAttribute('href').includes('#projects')) {
                link.classList.add('active');
            }
        });
    }
});

// Lightbox functionality
function openLightbox(src, alt) {
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${src}" alt="${alt || 'Документ'}" loading="lazy">
        </div>
    `;
    
    // Add to page
    document.body.appendChild(lightbox);
    
    // Close functionality
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    };
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const overlay = lightbox.querySelector('.lightbox-overlay');
    
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when lightbox is closed
    closeBtn.addEventListener('click', () => {
        document.body.style.overflow = '';
    });
    
    overlay.addEventListener('click', () => {
        document.body.style.overflow = '';
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.body.style.overflow = '';
        }
    });
}

// Clean up any unexpected images
function cleanupUnexpectedImages() {
    // Find any images directly after the footer
    const footer = document.querySelector('.footer');
    if (footer) {
        let nextElement = footer.nextElementSibling;
        while (nextElement) {
            const isBackToTop = nextElement.classList && nextElement.classList.contains('back-to-top');
            const isScript = nextElement.tagName === 'SCRIPT';
            
            if (!isBackToTop && !isScript) {
                // Remove unexpected element
                const tempElement = nextElement;
                nextElement = nextElement.nextElementSibling;
                tempElement.remove();
            } else {
                nextElement = nextElement.nextElementSibling;
            }
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27a337' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .project-card, .about-content, .certificates-content, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });

    // Service Cards Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Performance optimizations
function optimizePerformance() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
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
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // Debounced scroll handler
    const header = document.querySelector('.header');
    window.addEventListener('scroll', debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }, 100));
}

// Utility: Debounce function
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