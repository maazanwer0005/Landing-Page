
// ===== POPUP CONTROL =====
const popup = document.getElementById('popupOverlay');
const popupForm = document.getElementById('popupForm');
const closeBtn = document.getElementById('closePopup');

// Show popup after 5 seconds
setTimeout(() => {
    if (popup && popupForm) {
        popup.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add animation classes after a small delay
        setTimeout(() => {
            popupForm.classList.remove('scale-95', 'opacity-0');
            popupForm.classList.add('scale-100', 'opacity-100');
        }, 50);
    }
}, 5000);

// Open popup on button click (except WhatsApp buttons)
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && 
        !e.target.classList.contains('whatsapp') && 
        !e.target.closest('form') && 
        !e.target.closest('#popupOverlay') &&
        e.target.id !== 'mobileMenuButton') {
        console.log('Button clicked, showing popup:', e.target);
        e.preventDefault();
        if (popup && popupForm) {
            popup.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Add animation classes after a small delay
            setTimeout(() => {
                popupForm.classList.remove('scale-95', 'opacity-0');
                popupForm.classList.add('scale-100', 'opacity-100');
            }, 50);
        }
    }
});

// Close popup
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (popup && popupForm) {
            // Remove animation classes first
            popupForm.classList.remove('scale-100', 'opacity-100');
            popupForm.classList.add('scale-95', 'opacity-0');
            
            // Hide popup after animation
            setTimeout(() => {
                popup.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
    });
}

// Close popup on outside click
if (popup) {
    popup.addEventListener('click', (e) => {
        if (e.target === popup && popupForm) {
            // Remove animation classes first
            popupForm.classList.remove('scale-100', 'opacity-100');
            popupForm.classList.add('scale-95', 'opacity-0');
            
            // Hide popup after animation
            setTimeout(() => {
                popup.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
    });
}

// Close popup on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup && !popup.classList.contains('hidden') && popupForm) {
        // Remove animation classes first
        popupForm.classList.remove('scale-100', 'opacity-100');
        popupForm.classList.add('scale-95', 'opacity-0');
        
        // Hide popup after animation
        setTimeout(() => {
            popup.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('mobileMenuButton');
const navLinks = document.getElementById('mobileMenu');
const menuCloseIcon = document.getElementById('menu-close');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpening = !navLinks.classList.contains('hidden');
        navLinks.classList.toggle('hidden');
        if (menuCloseIcon) menuCloseIcon.classList.toggle('hidden', !isOpening);
        menuToggle.classList.toggle('hidden', isOpening);
    });

    if (menuCloseIcon) {
        menuCloseIcon.addEventListener('click', () => {
            navLinks.classList.add('hidden');
            if (menuCloseIcon) menuCloseIcon.classList.add('hidden');
            menuToggle.classList.remove('hidden');
        });
    }

    document.querySelectorAll('#mobileMenu a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.add('hidden');
            if (menuCloseIcon) menuCloseIcon.classList.add('hidden');
            menuToggle.classList.remove('hidden');
        });
    });
}

// Accordion functionality
function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById('icon' + id.slice(-1));
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

// Countdown Timer
function updateCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Set your target date (e.g., 30 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    function update() {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        // Stop the countdown when it reaches zero
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysElement.textContent = days.toString().padStart(2, '0');
      hoursElement.textContent = hours.toString().padStart(2, '0');
      minutesElement.textContent = minutes.toString().padStart(2, '0');
      secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Call immediately to show the initial time
    update();

    // Update every second
    const interval = setInterval(update, 1000);
  }

  // Run the countdown
  updateCountdown();

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 80; // Account for fixed header
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== LEAD FORM SUBMISSION =====
document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', function (e) {
            e.preventDefault();
            
        const name = form.querySelector("input[name='name']")?.value.trim() || "";
        const phone = form.querySelector("input[name='phone']")?.value.trim() || "";
        const email = form.querySelector("input[name='email']")?.value.trim() || "";
        const comments = form.querySelector("textarea[name='comments']")?.value.trim() || "";

        // Static data for the new columns
        const projectName = 'AMRUTHA PLATINUM TOWERS';
        const location = 'Nallurahalli Siddapura Road, Whitefield, East Bangalore';
        const zone = 'Bangalore East';

        if (!name || !phone) {
            alert('⚠️ Please fill all required fields (Name & Phone).');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                alert('Please enter a valid 10-digit phone number.');
                return;
            }
            
        // Email validation (if provided)
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"], button');
        const originalText = submitBtn ? submitBtn.textContent : null;
        if (submitBtn) {
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
        }

        // Prepare data
        const data = {
            name,
            email,
            phone,
            comments,
            project_name: projectName,
            location: location,
            zone: zone,
            timestamp: new Date().toISOString()
        };

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwcYAs-8shmPyINhplL8EnJQ-v-uIPjQKbm2J3Og_x8srfWvxuSrh4WbvtVsdBZVHyV/exec';

        console.log('Sending data to Google Apps Script:', data);

        // Send data
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data),
        })
        .then(() => {
            console.log('✅ Data sent successfully.');
            
            // WhatsApp Backup
            const whatsappNumber = '919035086850';
            const message = `📋 *New Lead Captured!*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email}\n💬 Comments: ${comments}\n\n🏢 Project: ${projectName}\n📍 Location: ${location}\n🗺️ Zone: ${zone}`;

            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');

            form.reset();
            alert('✅ Thank you! Your information has been saved. Our team will contact you shortly.');
            
            // Close popup if it's open
            if (popup && !popup.classList.contains('hidden') && popupForm) {
                // Remove animation classes first
                popupForm.classList.remove('scale-100', 'opacity-100');
                popupForm.classList.add('scale-95', 'opacity-0');
                
                // Hide popup after animation
                setTimeout(() => {
                    popup.classList.add('hidden');
                    document.body.style.overflow = '';
                }, 300);
            }
        })
        .catch((error) => {
            console.error('❌ Error sending data:', error);

            // Fallback: Send to WhatsApp if Apps Script fails
            const whatsappNumber = '919035086850';
            const message = `📋 *New Lead Captured! (Backup)*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email}\n💬 Comments: ${comments}\n\n🏢 Project: ${projectName}\n📍 Location: ${location}\n🗺️ Zone: ${zone}`;

            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');

                form.reset();
            alert('⚠️ Thank you! Our team will contact you shortly. (Data backup sent via WhatsApp)');
            
            // Close popup if it's open
            if (popup && !popup.classList.contains('hidden') && popupForm) {
                // Remove animation classes first
                popupForm.classList.remove('scale-100', 'opacity-100');
                popupForm.classList.add('scale-95', 'opacity-0');
                
                // Hide popup after animation
                setTimeout(() => {
                    popup.classList.add('hidden');
                    document.body.style.overflow = '';
                }, 300);
            }
        })
        .finally(() => {
            // Reset button
            if (submitBtn && originalText !== null) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    });
});

// ===== PHONE INPUT FORMATTING =====
document.querySelectorAll('input[type="tel"]').forEach((input) => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
    });
});

// ===== WHATSAPP FUNCTIONALITY =====
document.querySelectorAll('.whatsapp').forEach((button) => {
    button.addEventListener('click', function() {
        console.log('WhatsApp button clicked:', this);
        const message = 'Hi, I am interested in Amrutha Platinum Towers. Please provide more information about the project.';
        const whatsappUrl = `https://wa.me/919035086850?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});

// Phone call functionality
document.addEventListener('DOMContentLoaded', function() {
    const phoneButtons = document.querySelectorAll('.fa-phone');
    
    phoneButtons.forEach(button => {
        if (button.closest('button')) {
            button.closest('button').addEventListener('click', function() {
                window.location.href = 'tel:+919035086850';
            });
        }
    });
});

// Button animations
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide header
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up - show header
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});
