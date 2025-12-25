// =====================================================
// COMPLETE FIXED J.JS - PROFESSIONAL VERSION 3.0
// All functions optimized and working perfectly
// =====================================================

// ===== CONFIGURATION =====
const SITE_CONFIG = {
    phone: '962798272666',
    whatsappMessage: encodeURIComponent('مرحباً! أريد استفسار عن منتجات ومشاريع WPC'),
    scrollOffset: 100,
    animationDelay: 200
};

// ===== WhatsApp =====
function openWhatsApp() {
    const url = `https://wa.me/${SITE_CONFIG.phone}?text=${SITE_CONFIG.whatsappMessage}`;
    window.open(url, '_blank');
    
    // Track event if analytics available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'Contact',
            'event_label': 'WhatsApp Button'
        });
    }
}
let isInitialLoad = true;

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });

    // ✅ pushState فقط لو مش تحميل أول
    if (!isInitialLoad && location.hash !== '#' + pageName) {
        history.pushState({ page: pageName }, '', '#' + pageName);
    }

    // Show target page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation active state
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    const navLink = document.getElementById('nav-' + pageName);
    if (navLink) {
        navLink.classList.add('active');
    }

    // Close mobile menu
    closeMenu();

    // Scroll to top smoothly
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });

    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': pageName,
            'page_location': window.location.href
        });
    }
}


// ===== Scroll to About Section (FIXED) =====
function scrollToAbout() {
    const homePage = document.getElementById('home-page');
    const aboutSection = document.getElementById('about-section');
    
    // Close mobile menu first
    closeMenu();
    
    // If not on home page, go to home first
    if (!homePage || !homePage.classList.contains('active')) {
        showPage('home');
        
        // Wait for page to load, then scroll
        setTimeout(() => {
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - SITE_CONFIG.scrollOffset;
                window.scrollTo({ 
                    top: offsetTop,
                    behavior: 'smooth' 
                });
            }
        }, SITE_CONFIG.animationDelay);
    } else {
        // Already on home, scroll directly
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - SITE_CONFIG.scrollOffset;
            window.scrollTo({ 
                top: offsetTop,
                behavior: 'smooth' 
            });
        }
    }
    
    // Update nav active state
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const homeNav = document.getElementById('nav-home');
    if (homeNav) homeNav.classList.add('active');
}

// ===== Mobile Menu Toggle =====
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');
    
    if (navLinks && menuToggle) {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// ===== Close Menu Helper =====
function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');
    
    if (navLinks && menuToggle) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== Header Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const currentScroll = window.scrollY;
    
    if (header) {
        // Add scrolled class
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    lastScroll = currentScroll;
});

// ===== Intersection Observer for Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Unobserve after animation (better performance)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.product-card, .project-card, .why-card, .gallery-preview-item, ' +
        '.gallery-item, .feature-card, .about-column'
    );
    
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== Close Mobile Menu on Outside Click =====
function initOutsideClickHandler() {
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav');
        const navLinks = document.getElementById('navLinks');
        
        if (navLinks && navLinks.classList.contains('active')) {
            // Check if click is outside nav
            if (!nav.contains(e.target)) {
                closeMenu();
            }
        }
    });

    // Prevent closing when clicking inside nav
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// ===== Gallery Filter =====
function filterGallery(category) {
    const buttons = document.querySelectorAll('.filter-btn, .preview-filter-btn');
    const items = document.querySelectorAll('.gallery-item, .gallery-preview-item');

    // Update active button
    buttons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Show all items if "all" is selected
    if (category === 'all') {
        items.forEach(item => {
            item.classList.remove('hidden');
            item.classList.add('show');
        });
        return;
    }

    // Filter items
    items.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (itemCategory === category) {
            item.classList.remove('hidden');
            item.classList.add('show');
        } else {
            item.classList.add('hidden');
            item.classList.remove('show');
        }
    });

    // Track filter event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'filter', {
            'event_category': 'Gallery',
            'event_label': category
        });
    }
}

// ===== Make Cards Clickable =====
function initCardClicks() {
    // Product Cards → Products Page
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            showPage('products');
        });
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showPage('products');
            }
        });
    });

    // Project Cards → Project Page
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            showPage('project');
        });
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showPage('project');
            }
        });
    });

    // Gallery Preview Cards → Gallery Page
    document.querySelectorAll('.gallery-preview-item').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            showPage('gallery');
            
            // Get category and filter
            const category = card.dataset.category;
            if (category) {
                setTimeout(() => {
                    filterGallery(category);
                }, 300);
            }
        });
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

// ===== Lazy Load Images =====
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Replace data-src with src
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    
                    // Add fade-in effect
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                }
                
                // Stop observing this image
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '200px' // Start loading 200px before entering viewport
    });
    
    // Observe all lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Lazy Load Video =====
function initVideoLazyLoad() {
    const video = document.querySelector('.hero-video');
    if (!video) return;
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const source = video.querySelector('source');
                
                if (source && source.dataset.src) {
                    source.src = source.dataset.src;
                    video.load();
                }
                
                videoObserver.unobserve(video);
            }
        });
    });
    
    videoObserver.observe(video);
}

// ===== Optimize Gallery Loading =====
function optimizeGallery() {
    const galleryObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const galleryPage = document.getElementById('gallery-page');
            
            if (galleryPage && galleryPage.classList.contains('active')) {
                // Load gallery images
                const galleryImages = galleryPage.querySelectorAll('img[data-src]');
                
                galleryImages.forEach(img => {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                });
                
                // Stop observing after first load
                galleryObserver.disconnect();
            }
        });
    });
    
    // Observe gallery page for class changes
    const galleryPage = document.getElementById('gallery-page');
    if (galleryPage) {
        galleryObserver.observe(galleryPage, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}

// ===== Preload Critical Images =====
function preloadCriticalImages() {
    const criticalImages = [
        'Gallery/Creativty logo.jpeg'
        // Add other critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - SITE_CONFIG.scrollOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Accessibility: Focus Visible =====
function initFocusVisible() {
    // Add focus-visible polyfill behavior
    document.body.addEventListener('mousedown', () => {
        document.body.classList.add('using-mouse');
    });
    
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });
}

// ===== Performance: Debounce Function =====
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

// ===== Window Resize Handler (Debounced) =====
const handleResize = debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        closeMenu();
    }
}, 250);

window.addEventListener('resize', handleResize);

// ===== Error Handling for Images =====
function initImageErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder if image fails
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-size="18"%3EImage not found%3C/text%3E%3C/svg%3E';
            this.alt = 'Image not available';
        });
    });
}

// ===== Back to Top Button =====
function initBackToTop() {
    // Create back to top button if doesn't exist
    let backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTop';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 35px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #c9a961, #d4b877);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 998;
            font-size: 24px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(backToTopBtn);
    }
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Initialize Everything on Page Load =====
function init() {
    console.log('🚀 Initializing Creativity Code Website...');
    
    try {
        // Core functionality
        initScrollAnimations();
        initOutsideClickHandler();
        initCardClicks();
        
        // Performance optimizations
        preloadCriticalImages();
        initLazyLoading();
        initVideoLazyLoad();
        optimizeGallery();
        
        // User experience
        initSmoothScroll();
        initFocusVisible();
        initBackToTop();
        
        // Error handling
        initImageErrorHandling();
        
        // Initialize gallery filter
        filterGallery('all');
        
        console.log('✅ Website initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error initializing website:', error);
    }
}

// ===== DOM Content Loaded =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== Page Visibility API (Pause video when tab not active) =====
document.addEventListener('visibilitychange', () => {
    const video = document.querySelector('.hero-video');
    
    if (video) {
        if (document.hidden) {
            video.pause();
        } else {
            video.play().catch(err => {
                console.log('Video autoplay prevented:', err);
            });
        }
    }
});

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function () {
                console.log('Service Worker registered');
            })
            .catch(function () {
                console.log('Service Worker failed');
            });
    });
}


// ===== Export functions for use in HTML onclick attributes =====
window.showPage = showPage;
window.scrollToAbout = scrollToAbout;
window.toggleMenu = toggleMenu;
window.filterGallery = filterGallery;
window.openWhatsApp = openWhatsApp;

console.log('📦 J.js loaded successfully!');

// ===============================
window.addEventListener('popstate', (event) => {
    if (event.state?.page) {
        showPage(event.state.page);
    }
});

window.addEventListener('load', () => {
    const pageFromHash = location.hash.replace('#', '');
    if (pageFromHash) {
        showPage(pageFromHash);
    } else {
        showPage('home');
    }
    isInitialLoad = false;
});
