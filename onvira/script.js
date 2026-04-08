// ========== Scroll Reveal Animation ==========
const revealElements = document.querySelectorAll('.service-card, .example-card, .about-content, .about-image, .contact-info, .contact-form-wrapper, .section-header');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ========== Navbar Scroll Effect ==========
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========== Mobile Menu Toggle ==========
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    
    if (navLinks.classList.contains('mobile-active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    } else {
        navLinks.style.display = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        navLinks.style.display = '';
    });
});

// ========== Smooth Scroll for Anchor Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Contact Form Submission to Google Sheets ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    try {
        // Submit to Google Sheets
        const response = await fetch('https://script.google.com/macros/s/AKfycbxx5iR2ddSwenpLP3Vpzc-Z9U3Xi_EhMTBpeq-K_sb8VRDGEGJavGqoGjfj7gYETHk/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Show success message
        submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
        
    } catch (error) {
        console.error('Error:', error);
        
        // Show error message
        submitBtn.innerHTML = '<span>Error! Try Again</span> <i class="fas fa-exclamation-circle"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    }
});

// ========== Form Input Animation ==========
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// ========== Stats Counter Animation ==========
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    
    stats.forEach(stat => {
        const target = stat.textContent;
        
        if (target.includes('%')) {
            stat.style.opacity = '0';
            setTimeout(() => {
                stat.style.transition = 'opacity 0.5s';
                stat.style.opacity = '1';
            }, 200);
        } else if (target.includes('/')) {
            stat.style.opacity = '0';
            setTimeout(() => {
                stat.style.transition = 'opacity 0.5s';
                stat.style.opacity = '1';
            }, 200);
        } else {
            const num = parseInt(target);
            if (!isNaN(num)) {
                let current = 0;
                const increment = num / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= num) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                }, 30);
            }
        }
    });
    
    statsAnimated = true;
};

// Trigger stats animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateStats, 500);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ========== Parallax Effect for Floating Cards ==========
const floatingCards = document.querySelectorAll('.floating-card');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    floatingCards.forEach((card, index) => {
        const speed = (index + 1) * 10;
        const x = mouseX * speed;
        const y = mouseY * speed;
        
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ========== Add CSS for mobile menu ==========
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.mobile-active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            z-index: 999;
        }
        
        .nav-links.mobile-active li {
            margin: 10px 0;
        }
    }
`;
document.head.appendChild(style);

// ========== Console Message ==========
console.log('%c🚀 Onvira', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cDigital Solutions Agency', 'font-size: 14px; color: #64748b;');
console.log('%cContact: contact@onvira.co.ke | 0769 537 543', 'font-size: 12px; color: #64748b;');
