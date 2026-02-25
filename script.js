// Script for Brandon Santini Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Language Toggle Functionality
    const langEs = document.getElementById('lang-es');
    const langEn = document.getElementById('lang-en');
    let currentLang = 'es';

    function switchLanguage(lang) {
        currentLang = lang;
        document.body.className = lang === 'en' ? 'lang-en' : '';
        
        // Update button states
        langEs.classList.toggle('active', lang === 'es');
        langEn.classList.toggle('active', lang === 'en');
        
        // Update all elements with data-es and data-en attributes
        const elementsWithLang = document.querySelectorAll('[data-es], [data-en]');
        elementsWithLang.forEach(element => {
            if (element.hasAttribute('data-' + lang)) {
                element.textContent = element.getAttribute('data-' + lang);
            }
        });
        
        // Store preference
        localStorage.setItem('preferred-language', lang);
    }

    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'es';
    switchLanguage(savedLang);

    // Event listeners for language buttons
    langEs.addEventListener('click', () => switchLanguage('es'));
    langEn.addEventListener('click', () => switchLanguage('en'));

    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Filmography Filter Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const filmItems = document.querySelectorAll('.film-item');

    function filterFilmography(category) {
        filmItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'flex';
                item.classList.remove('hidden');
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
    }

    // Add event listeners to tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter content
            const category = btn.getAttribute('data-tab');
            filterFilmography(category);
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 70;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 16, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 162, 255, 0.3)';
        } else {
            navbar.style.background = 'rgba(5, 5, 16, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbar);

    // Hero Section Parallax Effect
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3; // Reduced for smoother effect
        
        if (hero && window.innerWidth > 768) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
        
        if (heroContent && window.innerWidth > 768) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }

    window.addEventListener('scroll', parallaxEffect);

    // Sound Wave Animation for Featured Items
    function animateSoundWaves() {
        const featuredItems = document.querySelectorAll('.film-item.featured');
        featuredItems.forEach((item, index) => {
            const delay = index * 200;
            setTimeout(() => {
                item.style.animation = `soundWave 1.5s ease-in-out infinite`;
            }, delay);
        });
    }

    // Initialize sound wave animations after load
    setTimeout(animateSoundWaves, 1000);

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special animation for featured items
                if (entry.target.classList.contains('featured')) {
                    entry.target.style.boxShadow = '0 15px 50px rgba(0, 162, 255, 0.3)';
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.film-item, .gallery-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Gallery Placeholder Interactions
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Active Navigation Link Highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    // Style the back to top button with blue theme
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00a2ff, #0080ff);
        color: #ffffff;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(0, 162, 255, 0.4);
    `;

    // Show/hide back to top button
    function toggleBackToTopBtn() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }

    window.addEventListener('scroll', toggleBackToTopBtn);

    // Back to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-3px) scale(1.1)';
        backToTopBtn.style.boxShadow = '0 10px 30px rgba(0, 162, 255, 0.6)';
    });

    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'translateY(0) scale(1)';
        backToTopBtn.style.boxShadow = '0 5px 20px rgba(0, 162, 255, 0.4)';
    });

    // Typing Animation for Hero Quote
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation after a delay
    setTimeout(() => {
        const heroQuote = document.querySelector('.hero-quote');
        if (heroQuote) {
            const quoteText = heroQuote.textContent;
            typeWriter(heroQuote, quoteText, 30); // Slightly faster for voice theme
        }
    }, 2000);

    // Voice Acting Theme: Sound Visualization Effect
    function createSoundVisualizer() {
        const heroSection = document.querySelector('.hero');
        const visualizer = document.createElement('div');
        visualizer.className = 'sound-visualizer';
        visualizer.style.cssText = `
            position: absolute;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 3px;
            opacity: 0.3;
            z-index: 1;
        `;

        // Create sound bars
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.style.cssText = `
                width: 3px;
                height: ${Math.random() * 30 + 10}px;
                background: linear-gradient(0deg, #00a2ff, #0080ff);
                border-radius: 3px;
                animation: soundBar ${Math.random() * 1 + 0.5}s ease-in-out infinite alternate;
                box-shadow: 0 0 10px rgba(0, 162, 255, 0.5);
            `;
            visualizer.appendChild(bar);
        }

        heroSection.appendChild(visualizer);

        // Add CSS animation for sound bars
        const style = document.createElement('style');
        style.textContent = `
            @keyframes soundBar {
                0% { height: 10px; opacity: 0.5; }
                100% { height: 50px; opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize sound visualizer
    setTimeout(createSoundVisualizer, 3000);

    // Performance Optimization: Throttle scroll events
    function throttle(func, wait) {
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

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(updateNavbar, 10));
    window.addEventListener('scroll', throttle(parallaxEffect, 10));
    window.addEventListener('scroll', throttle(updateActiveNavLink, 10));
    window.addEventListener('scroll', throttle(toggleBackToTopBtn, 10));

    // Easter Egg: Konami Code for special effect
    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konami.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konami)) {
            // Special voice actor effect
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
                alert(currentLang === 'es' ? 
                    '¡Kageyama aprueba esta página! 🏐' : 
                    'Kageyama approves this page! 🏐'
                );
            }, 2000);
            konamiCode = [];
        }
    });

    // Initialize
    updateNavbar();
    updateActiveNavLink();
    
    console.log('🎙️ Brandon Santini Voice Actor Portfolio Website Loaded Successfully!');
    console.log('🏐 Ready to give voice to amazing characters!');
});