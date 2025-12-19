// ===== WhatsApp =====
function openWhatsApp() {
    const phoneNumber = '962798272666';
    const message = encodeURIComponent('مرحباً! أريد استفسار عن منتجات ومشاريع WPC');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// ===== Page Navigation =====
function showPage(pageName) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));

    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) targetPage.classList.add('active');

    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const navLink = document.getElementById('nav-' + pageName);
    if (navLink) navLink.classList.add('active');

    document.getElementById('navLinks').classList.remove('active');
    document.getElementById('menuToggle').classList.remove('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Scroll to About (FIXED) =====
function scrollToAbout() {
    const homePage = document.getElementById('home-page');
    const aboutSection = document.getElementById('about-section');
    
    // إغلاق المينو أولاً
    document.getElementById('navLinks').classList.remove('active');
    document.getElementById('menuToggle').classList.remove('active');
    
    // إذا مش في الصفحة الرئيسية، روح عليها أولاً
    if (!homePage || !homePage.classList.contains('active')) {
        showPage('home');
        
        // انتظر حتى تتحمل الصفحة، ثم scroll
        setTimeout(() => {
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 200);
    } else {
        // إذا أصلاً في home، scroll مباشرة
        if (aboutSection) {
            aboutSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // تحديث active state للـ nav
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const homeNav = document.getElementById('nav-home');
    if (homeNav) homeNav.classList.add('active');
}

// ===== Mobile Menu Toggle =====
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
    document.getElementById('menuToggle').classList.toggle('active');
}

// ===== Header Scroll Effect =====
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 100);
});

// ===== Intersection Observer =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.product-card, .project-card, .why-card, .gallery-preview-item'
).forEach(el => observer.observe(el));

// ===== Close Mobile Menu on Outside Click =====
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    const navLinks = document.getElementById('navLinks');
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) toggleMenu();
});

document.getElementById('navLinks')?.addEventListener('click', e => e.stopPropagation());

// ===== Gallery Filter =====
function filterGallery(category) {
    const buttons = document.querySelectorAll('.filter-btn, .preview-filter-btn');
    const items = document.querySelectorAll('.gallery-item, .gallery-preview-item');

    buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === category));

    if (category === 'all') {
        items.forEach(item => {
            item.classList.remove('hidden');
            item.classList.add('show');
        });
        return;
    }

    items.forEach(item => {
        const match = item.dataset.category === category;
        item.classList.toggle('hidden', !match);
        item.classList.toggle('show', match);
    });
}

// ===== Make Cards Clickable =====

// Product Cards → Products Page
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => showPage('products'));
});

// Project Cards → Project Page
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => showPage('project'));
});

// Cards on HOME → go to Gallery Page
document.querySelectorAll('.gallery-preview-item').forEach(card => {
    card.addEventListener('click', () => {
        showPage('gallery');
    });
});

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery filter
    filterGallery('all');
});
// ========================================
// LAZY LOADING SOLUTION FOR YOUR WEBSITE
// ========================================

// 1. LAZY LOAD IMAGES
// Add this to your J.js file

document.addEventListener('DOMContentLoaded', () => {
    // Lazy load all images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Replace data-src with src to actually load the image
                img.src = img.dataset.src;
                
                // Optional: Add a fade-in effect
                img.classList.add('loaded');
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, {
        // Start loading images 200px before they enter viewport
        rootMargin: '200px'
    });
    
    // Observe all lazy images
    lazyImages.forEach(img => imageObserver.observe(img));
});

// 2. LAZY LOAD VIDEO (Hero section)
// Only load video when user scrolls near it

const lazyVideo = () => {
    const video = document.querySelector('.hero-video');
    if (!video) return;
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Load the video source
                const source = video.querySelector('source');
                if (source && source.dataset.src) {
                    source.src = source.dataset.src;
                    video.load();
                }
            }
        });
    });
    
    videoObserver.observe(video);
};

// Call on page load
document.addEventListener('DOMContentLoaded', lazyVideo);

// 3. OPTIMIZE GALLERY LOADING
// Load gallery images only when gallery page is opened

const optimizeGallery = () => {
    // Load gallery images only when gallery page becomes active
    const galleryObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const galleryPage = document.getElementById('gallery-page');
            
            if (galleryPage && galleryPage.classList.contains('active')) {
                // Load gallery images
                const galleryImages = galleryPage.querySelectorAll('img[data-src]');
                galleryImages.forEach(img => {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                });
                
                // Stop observing after first load
                galleryObserver.disconnect();
            }
        });
    });
    
    // Observe the gallery page for class changes
    const galleryPage = document.getElementById('gallery-page');
    if (galleryPage) {
        galleryObserver.observe(galleryPage, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', optimizeGallery);

// 4. PROGRESSIVE IMAGE LOADING
// Show low-quality placeholder while loading high-quality image

const progressiveImageLoad = () => {
    const images = document.querySelectorAll('.progressive-image');
    
    images.forEach(container => {
        const img = container.querySelector('img[data-src]');
        const placeholder = container.querySelector('.placeholder');
        
        if (img) {
            const highResImg = new Image();
            highResImg.src = img.dataset.src;
            
            highResImg.onload = () => {
                img.src = highResImg.src;
                img.classList.add('loaded');
                
                if (placeholder) {
                    placeholder.style.opacity = '0';
                    setTimeout(() => placeholder.remove(), 300);
                }
            };
        }
    });
};

// 5. PRELOAD CRITICAL IMAGES
// Load hero/logo images immediately

const preloadCriticalImages = () => {
    const criticalImages = [
        'Gallery/Creativty logo.jpeg',
        // Add other critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

// Call immediately
preloadCriticalImages();

// 6. ADAPTIVE LOADING
// Load images based on connection speed

const adaptiveImageLoad = () => {
    // Check if user has slow connection
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    
    if (slowConnection) {
        // Load lower quality images
        document.querySelectorAll('img[data-src]').forEach(img => {
            const lowQualitySrc = img.dataset.src.replace('.jpg', '-low.jpg');
            img.dataset.src = lowQualitySrc;
        });
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', adaptiveImageLoad);

// 7. CANCEL LOADING WHEN SCROLLING AWAY
// Stop loading images if user scrolls past them quickly

let loadingImages = new Map();

const smartImageLoad = () => {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const img = entry.target;
            
            if (entry.isIntersecting) {
                // Start loading
                if (!loadingImages.has(img)) {
                    const loader = new Image();
                    loader.src = img.dataset.src;
                    loadingImages.set(img, loader);
                    
                    loader.onload = () => {
                        img.src = loader.src;
                        img.classList.add('loaded');
                        loadingImages.delete(img);
                    };
                }
            } else {
                // Cancel loading if scrolled away
                if (loadingImages.has(img)) {
                    const loader = loadingImages.get(img);
                    loader.src = ''; // Cancel load
                    loadingImages.delete(img);
                }
            }
        });
    }, {
        rootMargin: '100px'
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', smartImageLoad);