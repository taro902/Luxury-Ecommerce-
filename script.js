document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const productCards = document.querySelectorAll('.product-card');
    const collectionCards = document.querySelectorAll('.collection-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const actionButtons = document.querySelectorAll('.action-btn');
    const newsletterForm = document.querySelector('.newsletter-form');
    const heroProductShowcase = document.querySelector('.hero-product-showcase');
    const featureCards = document.querySelectorAll('.feature-card');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const navButtons = document.querySelectorAll('.nav-btn');
    const scrollToTopBtn = document.createElement('button');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const socialMediaLinks = document.querySelectorAll('.social-media-link');
    const socialLinks = document.querySelectorAll('.social-link');
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorTrail = document.querySelector('.cursor-trail');
    const rotatorItems = document.querySelectorAll('.rotator-item');
    const heroProductInfo = document.querySelector('.hero-product-info');
    
    let currentTestimonial = 0;
    let testimonialInterval;
    let cartCount = 3;
    let isScrolling = false;
    let currentRotatorIndex = 0;
    let rotatorInterval;
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    let mouseTimer;
    let particles = [];
    
    function initializeAll() {
        initializePreloader();
        initializeThemeToggle();
        loadThemePreference();
        initializeHeaderScroll();
        initializeSmoothScrolling();
        initializeProductInteractions();
        initializeCollectionInteractions();
        initializeFeatureAnimations();
        initializeFilterSystem();
        initializeActionButtons();
        initializeNewsletterForm();
        initializeTestimonialSlider();
        initializeScrollToTop();
        initializeHeroAnimations();
        initializeMobileMenu();
        initializeSocialMediaLinks();
        initializeCustomCursor();
        initializeHeroRotator();
        addDynamicStyles();
        document.body.style.overflow = 'hidden';
    }
    
    function initializePreloader() {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    if (preloader.parentNode) {
                        preloader.parentNode.removeChild(preloader);
                    }
                    document.body.style.overflow = 'auto';
                    initializeEntranceAnimations();
                    createWelcomeParticles();
                }, 1000);
            }, 3000);
        });
    }
    
    function initializeThemeToggle() {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('light-mode');
            const icon = themeToggle.querySelector('i');
            if (body.classList.contains('light-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                createThemeParticles(themeToggle, '#d4af37');
                showNotification('Light mode activated', 'success');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                createThemeParticles(themeToggle, '#ffffff');
                showNotification('Dark mode activated', 'success');
            }
            saveThemePreference();
            createRippleEffect(themeToggle);
        });
    }
    
    function saveThemePreference() {
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }
    
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    function initializeHeaderScroll() {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 120) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            updateActiveNav();
            animateOnScroll();
        });
    }
    
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    function initializeSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    isScrolling = true;
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    setTimeout(() => { isScrolling = false; }, 1000);
                    createRippleEffect(this);
                }
            });
        });
    }
    
    function initializeProductInteractions() {
        productCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-20px)';
                this.style.boxShadow = '0 35px 70px rgba(0, 0, 0, 0.3)';
                this.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                const productInfo = this.querySelector('.product-meta h3');
                if (productInfo) productInfo.style.color = '#d4af37';
                createHoverParticles(this, '#d4af37');
                createFloatingEffect(this);
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                this.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                const productInfo = this.querySelector('.product-meta h3');
                if (productInfo) productInfo.style.color = '';
            });
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }
    
    function initializeCollectionInteractions() {
        collectionCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                const overlay = this.querySelector('.collection-overlay');
                const content = this.querySelector('.collection-content');
                const image = this.querySelector('img');
                if (overlay) overlay.style.opacity = '1';
                if (content) content.style.transform = 'translateY(0)';
                if (image) image.style.transform = 'scale(1.1)';
                createHoverParticles(this, '#ffffff');
                createGlowEffect(this);
            });
            card.addEventListener('mouseleave', function() {
                const overlay = this.querySelector('.collection-overlay');
                const content = this.querySelector('.collection-content');
                const image = this.querySelector('img');
                if (overlay) overlay.style.opacity = '0';
                if (content) content.style.transform = 'translateY(30px)';
                if (image) image.style.transform = 'scale(1)';
            });
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }
    
    function initializeFeatureAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    createHoverParticles(entry.target, '#d4af37');
                    createFloatingEffect(entry.target);
                }
            });
        }, { threshold: 0.1 });
        featureCards.forEach((card, index) => {
            observer.observe(card);
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }
    
    function initializeFilterSystem() {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
                createRippleEffect(this);
                createHoverParticles(this, '#d4af37');
            });
        });
    }
    
    function initializeActionButtons() {
        actionButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const action = this.getAttribute('data-action');
                const productCard = this.closest('.product-card') || this.closest('.hero-product-showcase');
                const productName = productCard ? 
                    (productCard.querySelector('.product-name') || productCard.querySelector('h3')).textContent : 'Product';
                switch(action) {
                    case 'wishlist':
                        handleWishlistAction(this, productName);
                        break;
                    case 'quickview':
                        handleQuickViewAction(this, productCard);
                        break;
                    case 'cart':
                        handleCartAction(this, productName);
                        break;
                }
                createRippleEffect(this);
            });
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    function handleWishlistAction(button, productName) {
        const icon = button.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.background = '#ff6b6b';
            button.style.color = 'white';
            showNotification(`${productName} added to wishlist`, 'success');
            createHoverParticles(button, '#ff6b6b');
            createHeartAnimation(button);
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.background = 'rgba(255, 255, 255, 0.95)';
            button.style.color = '#0a0a0a';
            showNotification(`${productName} removed from wishlist`, 'info');
        }
    }
    
    function handleQuickViewAction(button, productCard) {
        const productName = productCard.querySelector('.product-name')?.textContent || 
                          productCard.querySelector('h3')?.textContent || 'Premium Product';
        const productPrice = productCard.querySelector('.product-price')?.textContent || '$2,499.00';
        const productImage = productCard.querySelector('img')?.src || 'assets/images/product-detail.jpg';
        const productDescription = productCard.querySelector('.product-description')?.textContent || 
                                 'This is a premium luxury product with exceptional craftsmanship and materials.';
        showQuickViewModal(productName, productPrice, productImage, productDescription);
        createHoverParticles(button, '#4ecdc4');
        createZoomEffect(button);
    }
    
    function handleCartAction(button, productName) {
        animateToCart(button);
        updateCartCount();
        showNotification(`${productName} added to cart`, 'success');
        createHoverParticles(button, '#d4af37');
        createConfetti(button);
    }
    
    function initializeNewsletterForm() {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            const privacyCheckbox = this.querySelector('#privacy-policy');
            if (!privacyCheckbox.checked) {
                showNotification('Please agree to Privacy Policy', 'error');
                createShakeEffect(privacyCheckbox.closest('.form-checkbox'));
                return;
            }
            if (validateEmail(email)) {
                const originalBtnText = this.querySelector('button').textContent;
                this.querySelector('button').innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                this.querySelector('button').style.background = '#2ed573';
                showNotification('Thank you for subscribing!', 'success');
                createConfetti(this.querySelector('button'));
                createHoverParticles(this.querySelector('button'), '#2ed573');
                emailInput.value = '';
                privacyCheckbox.checked = false;
                setTimeout(() => {
                    this.querySelector('button').textContent = originalBtnText;
                    this.querySelector('button').style.background = '';
                }, 3000);
            } else {
                showNotification('Please enter a valid email address', 'error');
                createShakeEffect(emailInput);
            }
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function initializeTestimonialSlider() {
        function showTestimonial(index) {
            testimonialSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) slide.classList.add('active');
            });
            testimonialDots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) dot.classList.add('active');
            });
        }
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        }
        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        }
        showTestimonial(currentTestimonial);
        testimonialInterval = setInterval(nextTestimonial, 7000);
        navButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                clearInterval(testimonialInterval);
                if (this.classList.contains('next')) {
                    nextTestimonial();
                } else {
                    prevTestimonial();
                }
                testimonialInterval = setInterval(nextTestimonial, 7000);
                createRippleEffect(this);
            });
        });
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(testimonialInterval);
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
                testimonialInterval = setInterval(nextTestimonial, 7000);
                createHoverParticles(this, '#d4af37');
            });
        });
        const testimonialsContainer = document.querySelector('.testimonials-slider');
        testimonialsContainer.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
        testimonialsContainer.addEventListener('mouseleave', () => testimonialInterval = setInterval(nextTestimonial, 7000));
    }
    
    function initializeScrollToTop() {
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top-btn';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: -60px;
            right: 30px;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: #d4af37;
            color: #0a0a0a;
            border: none;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            opacity: 0.9;
        `;
        document.body.appendChild(scrollToTopBtn);
        window.addEventListener('scroll', function() {
            if (window.scrollY > 600) {
                scrollToTopBtn.style.bottom = '30px';
                scrollToTopBtn.style.opacity = '1';
            } else {
                scrollToTopBtn.style.bottom = '-60px';
                scrollToTopBtn.style.opacity = '0.9';
            }
        });
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            createHoverParticles(this, '#d4af37');
        });
        scrollToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(212, 175, 55, 0.5)';
        });
        scrollToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        });
    }
    
    function initializeHeroAnimations() {
        if (heroProductShowcase) {
            heroProductShowcase.addEventListener('mouseenter', function() {
                this.style.transform = 'perspective(1000px) rotateY(0deg) translateY(-20px)';
                this.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.4)';
                if (heroProductInfo) heroProductInfo.style.transform = 'translateY(0)';
                createGlowEffect(this);
            });
            heroProductShowcase.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateY(-5deg) translateY(0)';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.25)';
                if (heroProductInfo) heroProductInfo.style.transform = 'translateY(100%)';
            });
        }
    }
    
    function initializeMobileMenu() {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
            const icon = this.querySelector('i');
            if (nav.classList.contains('mobile-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                createHoverParticles(this, '#ffffff');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    function initializeSocialMediaLinks() {
        socialMediaLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
                createSocialMediaEffect(this);
            });
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) rotate(15deg)';
                createHoverParticles(this, '#d4af37');
            });
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotate(0)';
            });
        });
    }
    
    function initializeCustomCursor() {
        if (cursorFollower && cursorTrail) {
            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursorFollower.style.left = mouseX + 'px';
                cursorFollower.style.top = mouseY + 'px';
                clearTimeout(mouseTimer);
                mouseTimer = setTimeout(() => { cursorTrail.style.opacity = '0'; }, 100);
                cursorTrail.style.opacity = '0.7';
            });
            function animateTrail() {
                trailX += (mouseX - trailX) / 8;
                trailY += (mouseY - trailY) / 8;
                cursorTrail.style.left = trailX + 'px';
                cursorTrail.style.top = trailY + 'px';
                requestAnimationFrame(animateTrail);
            }
            animateTrail();
            const interactiveElements = document.querySelectorAll('button, a, .product-card, .collection-card, .feature-card');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorFollower.style.borderColor = '#ffffff';
                });
                el.addEventListener('mouseleave', () => {
                    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorFollower.style.borderColor = '#d4af37';
                });
            });
        }
    }
    
    function initializeHeroRotator() {
        function rotateHeroImage() {
            rotatorItems.forEach((item, index) => item.classList.remove('active'));
            currentRotatorIndex = (currentRotatorIndex + 1) % rotatorItems.length;
            rotatorItems[currentRotatorIndex].classList.add('active');
        }
        rotatorInterval = setInterval(rotateHeroImage, 4000);
        const rotator = document.querySelector('.product-rotator');
        if (rotator) {
            rotator.addEventListener('mouseenter', () => clearInterval(rotatorInterval));
            rotator.addEventListener('mouseleave', () => rotatorInterval = setInterval(rotateHeroImage, 4000));
        }
    }
    
    function createHoverParticles(element, color) {
        const rect = element.getBoundingClientRect();
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(particlesContainer);
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${particle.style.width};
                background: ${color};
                border-radius: 50%;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                opacity: 1;
                transition: all ${Math.random() * 2 + 1}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                box-shadow: 0 0 15px ${color};
            `;
            particlesContainer.appendChild(particle);
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            setTimeout(() => {
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = '0';
            }, 10);
        }
        setTimeout(() => {
            if (particlesContainer.parentNode) document.body.removeChild(particlesContainer);
        }, 2000);
    }
    
    function createConfetti(element) {
        const rect = element.getBoundingClientRect();
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
        `;
        document.body.appendChild(confettiContainer);
        const colors = ['#d4af37', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: ${Math.random() * 12 + 6}px;
                height: ${Math.random() * 12 + 6}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                opacity: 1;
                transition: all ${Math.random() * 3 + 2}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                transform: rotate(0deg);
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            `;
            confettiContainer.appendChild(confetti);
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 300 + 150;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const rotation = Math.random() * 1080;
            setTimeout(() => {
                confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
                confetti.style.opacity = '0';
            }, 10);
        }
        setTimeout(() => {
            if (confettiContainer.parentNode) document.body.removeChild(confettiContainer);
        }, 3000);
    }
    
    function createRippleEffect(element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(212, 175, 55, 0.3);
            transform: translate(-50%, -50%);
            left: ${rect.width/2}px;
            top: ${rect.height/2}px;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
        `;
        element.style.position = 'relative';
        element.appendChild(ripple);
        setTimeout(() => {
            ripple.style.width = rect.width * 2 + 'px';
            ripple.style.height = rect.height * 2 + 'px';
            ripple.style.opacity = '0';
        }, 10);
        setTimeout(() => {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 800);
    }
    
    function createHeartAnimation(element) {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.cssText = `
            position: fixed;
            z-index: 9999;
            color: #ff6b6b;
            font-size: 24px;
            pointer-events: none;
            left: ${element.getBoundingClientRect().left + element.offsetWidth/2}px;
            top: ${element.getBoundingClientRect().top + element.offsetHeight/2}px;
            transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform: translate(-50%, -50%);
            text-shadow: 0 0 15px rgba(255, 107, 107, 0.8);
            opacity: 1;
        `;
        document.body.appendChild(heart);
        setTimeout(() => {
            heart.style.top = (element.getBoundingClientRect().top - 120) + 'px';
            heart.style.opacity = '0';
            heart.style.transform = 'translate(-50%, -50%) scale(2)';
        }, 10);
        setTimeout(() => {
            if (heart.parentNode) document.body.removeChild(heart);
        }, 1200);
    }
    
    function createZoomEffect(element) {
        element.style.transform = 'scale(1.3)';
        setTimeout(() => { element.style.transform = 'scale(1)'; }, 200);
    }
    
    function createShakeEffect(element) {
        element.style.animation = 'shake 0.6s ease';
        setTimeout(() => { element.style.animation = 'none'; }, 600);
    }
    
    function createFloatingEffect(element) {
        let position = 0;
        const originalTransform = element.style.transform || '';
        function float() {
            position += 0.03;
            const yOffset = Math.sin(position) * 8;
            element.style.transform = `${originalTransform} translateY(${yOffset}px)`;
            requestAnimationFrame(float);
        }
        float();
        setTimeout(() => { element.style.transform = originalTransform; }, 3000);
    }
    
    function createGlowEffect(element) {
        element.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.6)';
        setTimeout(() => { element.style.boxShadow = ''; }, 1000);
    }
    
    function createSocialMediaEffect(element) {
        const platform = Array.from(element.classList).find(cls => 
            ['instagram', 'facebook', 'twitter', 'pinterest', 'youtube'].includes(cls)
        );
        let color;
        switch(platform) {
            case 'instagram': color = '#e1306c'; break;
            case 'facebook': color = '#3b5998'; break;
            case 'twitter': color = '#1da1f2'; break;
            case 'pinterest': color = '#bd081c'; break;
            case 'youtube': color = '#ff0000'; break;
            default: color = '#d4af37';
        }
        element.style.boxShadow = `0 0 30px ${color}`;
        createHoverParticles(element, color);
    }
    
    function createThemeParticles(element, color) {
        const rect = element.getBoundingClientRect();
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(particlesContainer);
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 4}px;
                height: ${particle.style.width};
                background: ${color};
                border-radius: 50%;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                opacity: 1;
                transition: all ${Math.random() * 2.5 + 1.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                box-shadow: 0 0 20px ${color};
            `;
            particlesContainer.appendChild(particle);
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 250 + 150;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            setTimeout(() => {
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = '0';
            }, 10);
        }
        setTimeout(() => {
            if (particlesContainer.parentNode) document.body.removeChild(particlesContainer);
        }, 2500);
    }
    
    function animateToCart(element) {
        const animation = document.createElement('div');
        animation.innerHTML = '<i class="fas fa-shopping-cart"></i>';
        animation.style.cssText = `
            position: fixed;
            z-index: 9999;
            color: #d4af37;
            font-size: 28px;
            pointer-events: none;
            left: ${element.getBoundingClientRect().left + element.offsetWidth/2}px;
            top: ${element.getBoundingClientRect().top + element.offsetHeight/2}px;
            transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform: translate(-50%, -50%);
            text-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
            opacity: 1;
        `;
        document.body.appendChild(animation);
        const cart = document.querySelector('.cart-btn');
        const cartRect = cart.getBoundingClientRect();
        setTimeout(() => {
            animation.style.left = cartRect.left + cartRect.width/2 + 'px';
            animation.style.top = cartRect.top + cartRect.height/2 + 'px';
            animation.style.opacity = '0';
            animation.style.transform = 'translate(-50%, -50%) scale(0.1) rotate(360deg)';
        }, 10);
        setTimeout(() => {
            if (animation.parentNode) document.body.removeChild(animation);
        }, 1500);
    }
    
    function updateCartCount() {
        cartCount++;
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.animation = 'none';
            setTimeout(() => {
                cartCountElement.style.animation = 'bounce 0.8s ease';
            }, 10);
        }
    }
    
    function showQuickViewModal(name, price, image, description) {
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="quick-view-content">
                <span class="close-modal">&times;</span>
                <div class="quick-view-product">
                    <div class="quick-view-image">
                        <img src="${image}" alt="${name}">
                        <div class="image-navigation">
                            <button class="nav-btn prev"><i class="fas fa-chevron-left"></i></button>
                            <button class="nav-btn next"><i class="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                    <div class="quick-view-info">
                        <h2>${name}</h2>
                        <div class="product-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span>(128 reviews)</span>
                        </div>
                        <p class="product-description">${description}</p>
                        <div class="product-price">${price}</div>
                        <div class="product-options">
                            <div class="option">
                                <label>Color:</label>
                                <div class="color-options">
                                    <button class="color-option active" style="background: #d4af37;" data-color="Gold"></button>
                                    <button class="color-option" style="background: #c0c0c0;" data-color="Silver"></button>
                                    <button class="color-option" style="background: #000000;" data-color="Black"></button>
                                </div>
                            </div>
                            <div class="option">
                                <label>Quantity:</label>
                                <div class="quantity-selector">
                                    <button class="qty-btn" data-action="decrease">-</button>
                                    <input type="number" value="1" min="1" class="qty-input">
                                    <button class="qty-btn" data-action="increase">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="quick-view-actions">
                            <button class="btn btn-primary add-to-cart-modal">Add to Cart</button>
                            <button class="btn btn-secondary wishlist-modal"><i class="far fa-heart"></i> Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);
        const closeBtn = modal.querySelector('.close-modal');
        const addToCartBtn = modal.querySelector('.add-to-cart-modal');
        const wishlistBtn = modal.querySelector('.wishlist-modal');
        const qtyButtons = modal.querySelectorAll('.qty-btn');
        const qtyInput = modal.querySelector('.qty-input');
        const colorOptions = modal.querySelectorAll('.color-option');
        const navButtons = modal.querySelectorAll('.nav-btn');
        closeBtn.addEventListener('click', () => closeModal(modal));
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(modal); });
        addToCartBtn.addEventListener('click', () => {
            showNotification(`${name} added to cart!`, 'success');
            updateCartCount();
            createConfetti(addToCartBtn);
            closeModal(modal);
        });
        wishlistBtn.addEventListener('click', function() {
            showNotification(`${name} added to wishlist!`, 'success');
            createHoverParticles(wishlistBtn, '#ff6b6b');
            this.innerHTML = '<i class="fas fa-heart"></i> Added!';
            this.style.background = '#ff6b6b';
        });
        qtyButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                let value = parseInt(qtyInput.value);
                if (action === 'increase') {
                    qtyInput.value = value + 1;
                } else if (action === 'decrease' && value > 1) {
                    qtyInput.value = value - 1;
                }
                createRippleEffect(this);
            });
        });
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                showNotification(`Selected ${this.getAttribute('data-color')} color`, 'success');
                createHoverParticles(this, this.style.background);
            });
        });
        navButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const direction = this.classList.contains('next') ? 'next' : 'prev';
                showNotification(`Viewing ${direction} image`, 'info');
                createRippleEffect(this);
            });
        });
    }
    
    function closeModal(modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (modal.parentNode) document.body.removeChild(modal);
        }, 300);
    }
    
    function showNotification(message, type = 'success') {
        const existingNotification = document.querySelector('.notification-toast');
        if (existingNotification) existingNotification.remove();
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'info' ? 'fa-info-circle' : 'fa-heart'}"></i>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            padding: 20px 25px;
            border-radius: 12px;
            background: ${type === 'success' ? '#2ed573' : type === 'error' ? '#ff4757' : type === 'info' ? '#2196F3' : '#ff6b6b'};
            color: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            transform: translateX(150%);
            transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            max-width: 350px;
            font-weight: 500;
            font-size: 15px;
        `;
        document.body.appendChild(notification);
        setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 10);
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) document.body.removeChild(notification);
            }, 500);
        }, 4000);
    }
    
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .product-card, .collection-card, .testimonial-card, .section-header');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('scrolled-into-view');
            }
        });
    }
    
    function initializeEntranceAnimations() {
        const elements = document.querySelectorAll('.hero-text, .hero-image, .section-header, .feature-card, .product-card, .collection-card');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
    
    function createWelcomeParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(particlesContainer);
        const colors = ['#d4af37', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${particle.style.width};
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                transition: all ${Math.random() * 3 + 2}s ease;
                box-shadow: 0 0 10px currentColor;
            `;
            particlesContainer.appendChild(particle);
            setTimeout(() => {
                particle.style.opacity = '0.7';
                particle.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
            }, 10);
        }
        setTimeout(() => {
            if (particlesContainer.parentNode) document.body.removeChild(particlesContainer);
        }, 3000);
    }
    
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: scale(1); }
                40% { transform: scale(1.1); }
                60% { transform: scale(1.05); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
                20%, 40%, 60%, 80% { transform: translateX(8px); }
            }
            .scrolled-into-view {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: all 0.8s ease !important;
            }
            .quick-view-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .quick-view-content {
                background: #1a1a1a;
                border-radius: 20px;
                padding: 50px;
                max-width: 95%;
                max-height: 95%;
                overflow-y: auto;
                position: relative;
                width: 1000px;
                animation: modalAppear 0.5s ease;
                box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            @keyframes modalAppear {
                from { opacity: 0; transform: scale(0.8) translateY(-50px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .close-modal {
                position: absolute;
                top: 25px;
                right: 25px;
                font-size: 35px;
                cursor: pointer;
                color: #ffffff;
                transition: all 0.3s ease;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
            }
            .close-modal:hover {
                color: #d4af37;
                background: rgba(212, 175, 55, 0.2);
                transform: rotate(90deg);
            }
            .quick-view-product {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 50px;
            }
            .quick-view-image {
                position: relative;
                border-radius: 15px;
                overflow: hidden;
                transition: transform 0.3s ease;
                height: 500px;
            }
            .quick-view-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 15px;
                transition: transform 0.5s ease;
            }
            .quick-view-image:hover img {
                transform: scale(1.05);
            }
            .image-navigation {
                position: absolute;
                top: 50%;
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding: 0 30px;
                transform: translateY(-50%);
            }
            .nav-btn {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }
            .nav-btn:hover {
                background: #d4af37;
                transform: scale(1.1);
            }
            .quick-view-info h2 {
                font-size: 36px;
                margin-bottom: 20px;
                font-weight: 800;
                font-family: 'Playfair Display', serif;
            }
            .product-rating {
                display: flex;
                align-items: center;
                gap: 5px;
                margin-bottom: 25px;
            }
            .product-rating i {
                color: #d4af37;
                font-size: 18px;
            }
            .product-rating span {
                color: var(--text-secondary);
                font-size: 15px;
                margin-left: 15px;
            }
            .product-description {
                color: #cccccc;
                margin-bottom: 30px;
                line-height: 1.8;
                font-size: 17px;
            }
            .product-price {
                font-size: 36px;
                color: #d4af37;
                font-weight: 800;
                margin-bottom: 35px;
            }
            .product-options {
                margin-bottom: 40px;
            }
            .option {
                margin-bottom: 30px;
            }
            .option label {
                display: block;
                margin-bottom: 15px;
                font-weight: 600;
                font-size: 18px;
            }
            .color-options {
                display: flex;
                gap: 20px;
            }
            .color-option {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                border: 3px solid transparent;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .color-option.active {
                border-color: #d4af37;
                box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.3);
            }
            .color-option:hover {
                transform: scale(1.1);
            }
            .quantity-selector {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            .qty-btn {
                width: 50px;
                height: 50px;
                border-radius: 12px;
                background: #2a2a2a;
                border: 1px solid #3a3a3a;
                color: white;
                cursor: pointer;
                font-size: 22px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                font-weight: bold;
            }
            .qty-btn:hover {
                background: #d4af37;
                color: #0a0a0a;
                transform: scale(1.05);
            }
            .qty-input {
                width: 80px;
                padding: 12px;
                border-radius: 12px;
                border: 1px solid #3a3a3a;
                background: #2a2a2a;
                color: white;
                text-align: center;
                font-family: 'Montserrat', sans-serif;
                font-size: 18px;
                font-weight: 600;
            }
            .quick-view-actions {
                display: flex;
                gap: 20px;
            }
            .wishlist-modal {
                background: transparent;
                color: #ff6b6b;
                border: 2px solid #ff6b6b;
            }
            .wishlist-modal:hover {
                background: #ff6b6b;
                color: #0a0a0a;
            }
            @media (max-width: 768px) {
                .quick-view-product { grid-template-columns: 1fr; }
                .quick-view-content { width: 95%; padding: 30px; }
                .quick-view-actions { flex-direction: column; }
                .quick-view-info h2 { font-size: 28px; }
                .product-price { font-size: 28px; }
                .quick-view-image { height: 350px; }
            }
        `;
        document.head.appendChild(style);
    }
	
	initializeAll();
});