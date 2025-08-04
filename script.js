// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = mobileMenu.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger menu
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(20, 20, 20, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(20, 20, 20, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.special-card, .suggestion-card, .signature-card, .starter-card, .about-text, .hero-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Book Now Button Functionality
    const bookButtons = document.querySelectorAll('.cta-button, .nav-cta-btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            showReservationModal();
        });
    });

    // View Menu Buttons
    const viewMenuButtons = document.querySelectorAll('.view-menu-btn');
    
    viewMenuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dishName = this.closest('.special-card').querySelector('h3').textContent;
            showMenuModal(dishName);
        });
    });

    // Card Hover Effects
    const cards = document.querySelectorAll('.special-card, .suggestion-card, .signature-card, .starter-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const contactData = Object.fromEntries(formData);
        
        // Show success message
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        console.log('Contact Form Data:', contactData);
    });

    // Social Links
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent.toLowerCase();
            showNotification(Opening ${platform}..., 'info');
            
            // In a real application, these would link to actual social media pages
            setTimeout(() => {
                window.open('#', '_blank');
            }, 1000);
        });
    });

    // Reservation Modal
    function showReservationModal() {
        const modal = document.createElement('div');
        modal.className = 'reservation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Make a Reservation</h3>
                <p>Experience fine dining at its finest. Reserve your table today.</p>
                <form class="reservation-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="guest-name">Full Name</label>
                            <input type="text" id="guest-name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="guest-email">Email Address</label>
                            <input type="email" id="guest-email" name="email" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="guest-phone">Phone Number</label>
                            <input type="tel" id="guest-phone" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label for="party-size">Party Size</label>
                            <select id="party-size" name="partySize" required>
                                <option value="">Select party size</option>
                                <option value="1">1 person</option>
                                <option value="2">2 people</option>
                                <option value="3">3 people</option>
                                <option value="4">4 people</option>
                                <option value="5">5 people</option>
                                <option value="6">6 people</option>
                                <option value="7+">7+ people</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="reservation-date">Preferred Date</label>
                            <input type="date" id="reservation-date" name="date" required>
                        </div>
                        <div class="form-group">
                            <label for="reservation-time">Preferred Time</label>
                            <select id="reservation-time" name="time" required>
                                <option value="">Select time</option>
                                <option value="17:00">5:00 PM</option>
                                <option value="17:30">5:30 PM</option>
                                <option value="18:00">6:00 PM</option>
                                <option value="18:30">6:30 PM</option>
                                <option value="19:00">7:00 PM</option>
                                <option value="19:30">7:30 PM</option>
                                <option value="20:00">8:00 PM</option>
                                <option value="20:30">8:30 PM</option>
                                <option value="21:00">9:00 PM</option>
                                <option value="21:30">9:30 PM</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="special-requests">Special Requests (Optional)</label>
                        <textarea id="special-requests" name="requests" rows="3" placeholder="Dietary restrictions, special occasions, seating preferences..."></textarea>
                    </div>
                    <button type="submit" class="reserve-btn">Confirm Reservation</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Form submission
        const form = modal.querySelector('.reservation-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const reservationData = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Reservation confirmed! We will send you a confirmation email shortly.', 'success');
            document.body.removeChild(modal);
            
            // In a real application, you would send this data to a server
            console.log('Reservation Data:', reservationData);
        });
        
        // Set minimum date to today
        const dateInput = modal.querySelector('#reservation-date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Menu Modal
    function showMenuModal(dishName) {
        const menuItems = {
            'Seafood Paella': {
                description: 'Traditional Spanish paella with fresh seafood, saffron-infused rice, and aromatic herbs',
                price: '$42',
                ingredients: ['Fresh seafood', 'Saffron rice', 'Bell peppers', 'Green beans', 'Garlic', 'Spanish paprika'],
                allergens: ['Shellfish', 'May contain traces of gluten']
            },
            'Lamb Shank': {
                description: 'Slow-braised lamb shank with rosemary and red wine reduction',
                price: '$38',
                ingredients: ['Lamb shank', 'Red wine', 'Fresh rosemary', 'Root vegetables', 'Garlic', 'Herbs'],
                allergens: ['None']
            },
            'Beef Burger': {
                description: 'Premium wagyu beef burger with truffle aioli and aged cheddar',
                price: '$28',
                ingredients: ['Wagyu beef', 'Truffle aioli', 'Aged cheddar', 'Brioche bun', 'Caramelized onions'],
                allergens: ['Gluten', 'Dairy', 'Eggs']
            }
        };
        
        const item = menuItems[dishName] || menuItems['Seafood Paella'];
        
        const modal = document.createElement('div');
        modal.className = 'menu-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>${dishName}</h3>
                <div class="dish-details">
                    <p class="dish-description">${item.description}</p>
                    <div class="dish-price">${item.price}</div>
                    
                    <div class="dish-info">
                        <div class="ingredients">
                            <h4>Ingredients:</h4>
                            <ul>
                                ${item.ingredients.map(ingredient => <li>${ingredient}</li>).join('')}
                            </ul>
                        </div>
                        
                        <div class="allergens">
                            <h4>Allergen Information:</h4>
                            <p>${item.allergens.join(', ')}</p>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="reserve-table-btn" onclick="this.closest('.menu-modal').remove(); showReservationModal();">Reserve Table</button>
                        <button class="call-restaurant-btn" onclick="window.open('tel:+15551234567')">Call Restaurant</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Notification System
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = notification ${type};
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#8B0000' : type === 'info' ? '#2563eb' : '#dc2626'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 2000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            max-width: 300px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #8B0000;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#A52A2A';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#8B0000';
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
            const speed = scrolled * 0.3;
            hero.style.backgroundPosition = center ${speed}px;
        }
    });

    // Badge Animation
    const badge = document.querySelector('.badge-circle');
    if (badge) {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Image Loading Enhancement
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.background = '#f0f0f0';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = 'Image not available';
        });
    });

    // Performance optimization: Debounce scroll events
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

    // Apply debounce to scroll events
    const debouncedScroll = debounce(function() {
        // Additional scroll-based animations can be added here
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);

    // Initialize animations for elements already in view
    const elementsInView = document.querySelectorAll('.hero-content, .hero-badge');
    elementsInView.forEach(el => {
        el.classList.add('fade-in-up');
    });

    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // ESC key closes modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.reservation-modal, .menu-modal');
            modals.forEach(modal => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            });
            
            // Close mobile menu
            if (navMenu.classList.contains('active')) {
                mobileMenu.click();
            }
        }
        
        // Enter key on focused buttons
        if (e.key === 'Enter' && document.activeElement.tagName === 'BUTTON') {
            document.activeElement.click();
        }
    });

    // Restaurant Hours Display
    function updateRestaurantStatus() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
        
        let isOpen = false;
        let statusText = '';
        
        if (currentDay >= 1 && currentDay <= 4) { // Monday to Thursday
            isOpen = currentHour >= 17 && currentHour < 22;
            statusText = isOpen ? 'Open Now' : 'Closed - Opens at 5:00 PM';
        } else if (currentDay === 5 || currentDay === 6) { // Friday and Saturday
            isOpen = currentHour >= 17 && currentHour < 23;
            statusText = isOpen ? 'Open Now' : 'Closed - Opens at 5:00 PM';
        } else { // Sunday
            isOpen = currentHour >= 16 && currentHour < 21;
            statusText = isOpen ? 'Open Now' : 'Closed - Opens at 4:00 PM';
        }
        
        // Update status in contact section if element exists
        const statusElement = document.querySelector('.restaurant-status');
        if (statusElement) {
            statusElement.textContent = statusText;
            statusElement.style.color = isOpen ? '#8B0000' : '#666';
        }
    }

    // Update restaurant status on load and every minute
    updateRestaurantStatus();
    setInterval(updateRestaurantStatus, 60000);

    // Loading Screen (optional)
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        // Trigger entrance animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-content, .hero-badge');
            heroElements.forEach(el => {
                el.classList.add('fade-in-up');
            });
        }, 200);
    });

    // Form Validation Enhancement
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#dc2626';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        return isValid;
    }

    // Add validation to all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
});

// CSS for Modals
const modalStyles = `
.reservation-modal, .menu-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 20px;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    background: none;
    border: none;
}

.close-modal:hover {
    color: #8B0000;
}

.reservation-form, .dish-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #8B0000;
}

.reserve-btn, .reserve-table-btn, .call-restaurant-btn {
    background: #8B0000;
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
    margin-top: 1rem;
}

.reserve-btn:hover, .reserve-table-btn:hover, .call-restaurant-btn:hover {
    background: #A52A2A;
}

.dish-description {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.dish-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #8B0000;
    margin-bottom: 1.5rem;
}

.dish-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 1.5rem;
}

.ingredients h4, .allergens h4 {
    margin-bottom: 0.5rem;
    color: #333;
}

.ingredients ul {
    list-style: none;
    padding-left: 0;
}

.ingredients li {
    padding: 0.25rem 0;
    position: relative;
    padding-left: 1.5rem;
}

.ingredients li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #8B0000;
    font-weight: bold;
}

.allergens p {
    color: #666;
    font-style: italic;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.call-restaurant-btn {
    background: #2563eb;
}

.call-restaurant-btn:hover {
    background: #1d4ed8;
}

@media (max-width: 768px) {
    .modal-content {
        padding: 1.5rem;
        margin: 10px;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .dish-info {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .modal-actions {
        flex-direction: column;
    }
}
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);