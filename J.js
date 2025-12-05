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

// ===== Scroll to About =====
function scrollToAbout() {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.getElementById('nav-about')?.classList.add('active');
    toggleMenu();
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

document.addEventListener('DOMContentLoaded', () => {
    filterGallery('all');
    updateProductsLanguage();
});

// ===== Translation =====
function updateProductsLanguage() {
    document.querySelectorAll('.trans').forEach(el => {
        if (document.body.classList.contains('arabic')) {
            el.textContent = el.getAttribute('data-ar');
        } else {
            el.textContent = el.getAttribute('data-en');
        }
    });
}

document.querySelector('.lang-btn').addEventListener('click', updateProductsLanguage);

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
