// ========== Header Scroll Effect ==========
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== Hero Slider ==========
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Dot click events
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// ========== Booking Modal ==========
const modal = document.getElementById('bookingModal');
const closeModal = document.querySelector('.close-modal');
const selectedRoomSpan = document.getElementById('selectedRoom');

function showBookingModal(roomName) {
    selectedRoomSpan.textContent = roomName;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========== Form Submissions ==========
// Booking form
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Demo submission
    const submitBtn = bookingForm.querySelector('.btn-submit');
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Booking Confirmed (Demo)';
    submitBtn.style.background = '#10b981';
    
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        bookingForm.reset();
        submitBtn.innerHTML = 'Confirm Booking (Demo)';
        submitBtn.style.background = '';
        
        alert('This is a demo booking. In a real website, this would process your reservation and send confirmation details.');
    }, 1500);
});

// Contact form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Message Sent!';
    submitBtn.style.background = '#10b981';
    
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = 'Send Message';
        submitBtn.style.background = '';
        
        alert('This is a demo contact form. In a real website, your message would be sent to the hotel.');
    }, 1500);
});

// Booking widget form
const bookingWidget = document.querySelector('.booking-form');

bookingWidget.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    
    if (!checkin || !checkout) {
        alert('Please select check-in and check-out dates.');
        return;
    }
    
    alert(`Demo: Checking availability from ${checkin} to ${checkout}. In a real website, this would show available rooms and rates.`);
});

// ========== Set Default Dates ==========
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

document.getElementById('checkin').value = formatDate(today);
document.getElementById('checkout').value = formatDate(tomorrow);

// ========== Mobile Menu ==========
const mobileMenuBtn = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    alert('Mobile menu would open here. This is a demo website.');
});

// ========== Gallery Lightbox (Simple) ==========
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('span').textContent;
        
        // Create simple lightbox
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            cursor: pointer;
        `;
        
        lightbox.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <img src="${img.src}" style="max-width: 90vw; max-height: 80vh; border-radius: 8px;">
                <p style="color: white; margin-top: 20px; font-size: 1.25rem;">${title}</p>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        lightbox.addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });
    });
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
const revealElements = document.querySelectorAll('.room-card, .amenity-card, .gallery-item, .contact-item');

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
console.log('%c🏨 Grand Horizon Hotel', 'font-size: 24px; font-weight: bold; color: #c9a962;');
console.log('%cDemo website created by Onvira', 'font-size: 14px; color: #666;');
