// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Typing animation
    const typed = new Typed('.typed-text', {
        strings: [
            'Web Developer',
            'Mahasiswa Informatika',
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Navbar functionality
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const burger = document.querySelector('.burger');
    const navElements = document.querySelector('.nav-elements');

    // Sticky navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    burger.addEventListener('click', () => {
        navElements.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Active link highlighting
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Theme toggling
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme === 'dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark-mode' : '');
        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        icon.className = isDark ? 'ri-sun-line' : 'ri-moon-line';
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            const filter = button.dataset.filter;
            projectItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.display = 'block';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic validation
        const formData = new FormData(contactForm);
        const formProps = Object.fromEntries(formData);
        
        let isValid = true;
        const errors = {};

        // Validate name
        if (!formProps.name.trim()) {
            errors.name = 'Nama harus diisi';
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formProps.email)) {
            errors.email = 'Email tidak valid';
            isValid = false;
        }

        // Validate message
        if (!formProps.message.trim()) {
            errors.message = 'Pesan harus diisi';
            isValid = false;
        }

        if (!isValid) {
            showFormErrors(errors);
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="ri-loader-4-line rotating"></i> Mengirim...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Pesan berhasil terkirim!', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Gagal mengirim pesan. Silakan coba lagi.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    function showFormErrors(errors) {
        // Remove existing error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        // Display new error messages
        Object.entries(errors).forEach(([field, message]) => {
            const input = document.querySelector(`[name="${field}"]`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            input.parentNode.appendChild(errorDiv);
        });
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="ri-${type === 'success' ? 'checkbox-circle' : 'error-warning'}-line"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navElements.classList.remove('active');
                burger.classList.remove('active');

                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add parallax effect to home section
    const homeSection = document.querySelector('.home');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            homeSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
});