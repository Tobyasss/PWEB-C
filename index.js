// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Update active link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
        
        // Scroll to section
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-item, section').forEach(item => {
    observer.observe(item);
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Dark/Light Mode Toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const themeLabel = document.getElementById('theme-label');

if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        toggleSwitch.checked = true;
        themeLabel.textContent = 'Light Mode';
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        themeLabel.textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
        themeLabel.textContent = 'Dark Mode';
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Set initial label text
if (document.body.classList.contains('dark-mode')) {
    themeLabel.textContent = 'Light Mode';
} else {
    themeLabel.textContent = 'Dark Mode';
}