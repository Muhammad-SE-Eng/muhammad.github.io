// ===========================
// SMOOTH SCROLL NAVIGATION
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===========================
// SCROLL PROGRESS INDICATOR
// ===========================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ===========================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===========================
// SKILL BARS ANIMATION
// ===========================
function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, index * 100);
    });
}

// ===========================
// TYPING EFFECT
// ===========================
const typingText = document.getElementById('typingText');
const texts = [
    'Software Engineering Student',
    'C/C++ Developer',
    'Python Enthusiast',
    'Computer Vision Explorer',
    'Web Developer',
    'Video Editor'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// ===========================
// CONTACT FORM HANDLING
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');

    // Reset form
    contactForm.reset();
});

// Form validation
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#f5576c';
        } else {
            input.style.borderColor = '';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '';
    });
});

// ===========================
// PARALLAX EFFECT ON SCROLL
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===========================
// ACTIVE NAV LINK HIGHLIGHTING
// ===========================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===========================
// CURSOR TRAIL EFFECT (Optional Enhancement)
// ===========================
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

// Only add cursor effect on desktop
if (window.innerWidth > 768) {
    // Create cursor circles
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            pointer-events: none;
            opacity: 0;
            z-index: 9999;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(circle);
    }

    const allCircles = document.querySelectorAll('.circle');

    allCircles.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        allCircles.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.opacity = (20 - index) / 20;
            circle.style.transform = `scale(${(20 - index) / 20})`;

            const nextCircle = allCircles[index + 1] || allCircles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;

            circle.x = x;
            circle.y = y;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c👋 Welcome to my portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cLooking for a developer? Let\'s connect!', 'color: #764ba2; font-size: 14px;');

// ===========================
// PREVENT CONTEXT MENU (Optional)
// ===========================
// Uncomment if you want to disable right-click
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// ===========================
// EASTER EGG - KONAMI CODE
// ===========================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        console.log('🎉 You found the easter egg!');
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
