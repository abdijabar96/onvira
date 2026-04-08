// ========== Navigation Scroll Effect ==========
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== Menu Tabs ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        menuCategories.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        
        // Show corresponding category
        const category = btn.dataset.category;
        document.getElementById(category).classList.add('active');
    });
});

// ========== Order System Demo ==========
let order = [];
let total = 0;

function addToOrder(itemName, price) {
    order.push({ name: itemName, price: price });
    total += price;
    updateOrderDisplay();
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Added';
    btn.style.background = '#27ae60';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 1500);
}

function updateOrderDisplay() {
    const orderItemsContainer = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');
    const orderSummary = document.getElementById('orderSummary');
    
    if (order.length === 0) {
        orderSummary.style.display = 'none';
        return;
    }
    
    orderSummary.style.display = 'block';
    
    orderItemsContainer.innerHTML = order.map((item, index) => `
        <div class="order-item">
            <span>${item.name}</span>
            <span>$${item.price}</span>
        </div>
    `).join('');
    
    orderTotal.textContent = `$${total}`;
}

function checkout() {
    if (order.length === 0) {
        alert('Please add items to your order first.');
        return;
    }
    
    alert(`Demo: Order placed!\n\nTotal: $${total}\n\nIn a real restaurant website, this would process payment and send your order to the kitchen.`);
    
    // Reset order
    order = [];
    total = 0;
    updateOrderDisplay();
}

// ========== Reservation Form ==========
const reservationForm = document.getElementById('reservationForm');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = reservationForm.querySelector('.btn-submit');
    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Reservation Confirmed!';
    submitBtn.style.background = '#27ae60';
    
    setTimeout(() => {
        reservationForm.reset();
        submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Reservation';
        submitBtn.style.background = '';
        
        alert('Demo: Table reservation submitted! In a real restaurant website, you would receive a confirmation email or SMS.');
    }, 1500);
});

// ========== Set Minimum Date ==========
const dateInput = document.getElementById('resDate');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);
dateInput.value = today;

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

// ========== Gallery Lightbox ==========
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        
        // Create lightbox
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
            padding: 20px;
        `;
        
        lightbox.innerHTML = `
            <img src="${img.src}" style="max-width: 90vw; max-height: 90vh; border-radius: 8px;">
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        lightbox.addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });
    });
});

// ========== Scroll Reveal Animation ==========
const revealElements = document.querySelectorAll('.menu-item, .gallery-item, .about-feature, .contact-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
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
console.log('%c🍝 Bella Vista Restaurant', 'font-size: 24px; font-weight: bold; color: #c0392b;');
console.log('%cDemo website created by Onvira', 'font-size: 14px; color: #666;');
