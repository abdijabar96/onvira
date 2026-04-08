// ========== Appointment Form ==========
const appointmentForm = document.getElementById('appointmentForm');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = appointmentForm.querySelector('.btn-submit');
    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Appointment Requested!';
    submitBtn.style.background = '#06d6a0';
    
    setTimeout(() => {
        appointmentForm.reset();
        submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Appointment';
        submitBtn.style.background = '';
        
        alert('Demo: Appointment request submitted! In a real hospital website, you would receive a confirmation call or email.');
    }, 1500);
});

// ========== Book Doctor Function ==========
function bookDoctor(doctorName) {
    // Scroll to appointment section
    document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
    
    // Pre-fill doctor select (if it exists in the dropdown)
    const doctorSelect = document.querySelector('#appointmentForm select:nth-of-type(2)');
    if (doctorSelect) {
        // Find and select the matching option
        const options = doctorSelect.querySelectorAll('option');
        options.forEach(option => {
            if (option.textContent.includes(doctorName)) {
                option.selected = true;
            }
        });
    }
    
    // Show alert
    setTimeout(() => {
        alert(`Demo: Pre-filled appointment form for ${doctorName}. Please complete the form.`);
    }, 800);
}

// ========== Set Minimum Date for Appointment ==========
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];
dateInputs.forEach(input => {
    input.setAttribute('min', today);
});

// ========== Mobile Menu ==========
const mobileMenuBtn = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    alert('Mobile menu would open here. This is a demo website.');
});

// ========== Newsletter Form ==========
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const input = newsletterForm.querySelector('input');
    if (input.value) {
        alert('Thank you for subscribing! This is a demo - no email was actually sent.');
        input.value = '';
    }
});

// ========== Smooth Scroll ==========
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

// ========== Scroll Reveal Animation ==========
const revealElements = document.querySelectorAll('.service-card, .doctor-card, .dept-card, .stat-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// ========== Console Message ==========
console.log('%c🏥 Central Medical Hospital', 'font-size: 24px; font-weight: bold; color: #0077b6;');
console.log('%cDemo website created by Onvira', 'font-size: 14px; color: #666;');
