// Smooth scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'rgba(10, 10, 10, 0.98)';
        navLinks.style.padding = '2rem';
        navLinks.style.gap = '1.5rem';
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Photo upload functionality
const profileImage = document.getElementById('profileImage');
const photoUpload = document.getElementById('photoUpload');
const uploadOverlay = document.getElementById('uploadOverlay');

uploadOverlay.addEventListener('click', () => {
    photoUpload.click();
});

photoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            profileImage.src = event.target.result;
            // Store in localStorage
            localStorage.setItem('profilePhoto', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Load saved photo from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        profileImage.src = savedPhoto;
    }
    
    // Load college image
    const savedCollege = localStorage.getItem('collegePhoto');
    if (savedCollege) {
        document.getElementById('collegeImage').src = savedCollege;
    }
    
    // Load school images
    const savedSchool1 = localStorage.getItem('school1Photo');
    if (savedSchool1) {
        document.getElementById('school1Image').src = savedSchool1;
    }
    
    const savedSchool2 = localStorage.getItem('school2Photo');
    if (savedSchool2) {
        document.getElementById('school2Image').src = savedSchool2;
    }
    
    // Load resume PDF
    const savedResume = localStorage.getItem('resumePDF');
    if (savedResume) {
        const resumeBtn = document.getElementById('resumeBtn');
        resumeBtn.href = savedResume;
        resumeBtn.style.display = 'inline-flex';
    }
});

// Resume upload functionality
const uploadResumeBtn = document.getElementById('uploadResumeBtn');
const resumeUpload = document.getElementById('resumeUpload');
const resumeBtn = document.getElementById('resumeBtn');

if (uploadResumeBtn) {
    uploadResumeBtn.addEventListener('click', () => {
        resumeUpload.click();
    });
}

if (resumeUpload) {
    resumeUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onload = (event) => {
                const pdfData = event.target.result;
                localStorage.setItem('resumePDF', pdfData);
                resumeBtn.href = pdfData;
                resumeBtn.style.display = 'inline-flex';
                
                // Show success message
                alert('Resume uploaded successfully! ✅');
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a PDF file only.');
        }
    });
}

// School image upload functionality
const schoolOverlays = document.querySelectorAll('.school-upload-overlay');

schoolOverlays.forEach(overlay => {
    overlay.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        const uploadInput = document.getElementById(`${target}Upload`);
        if (uploadInput) {
            uploadInput.click();
        }
    });
});

// College upload
const collegeUpload = document.getElementById('collegeUpload');
const collegeImage = document.getElementById('collegeImage');

if (collegeUpload) {
    collegeUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                collegeImage.src = event.target.result;
                localStorage.setItem('collegePhoto', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

// School 1 upload
const school1Upload = document.getElementById('school1Upload');
const school1Image = document.getElementById('school1Image');

if (school1Upload) {
    school1Upload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                school1Image.src = event.target.result;
                localStorage.setItem('school1Photo', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

// School 2 upload
const school2Upload = document.getElementById('school2Upload');
const school2Image = document.getElementById('school2Image');

if (school2Upload) {
    school2Upload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                school2Image.src = event.target.result;
                localStorage.setItem('school2Photo', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

// 3D Card tilt effect on mouse move
const cards = document.querySelectorAll('.skill-card, .project-card, .achievement-card, .contact-card, .about-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Profile card 3D effect
const profileCard = document.querySelector('.profile-image-container');

if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.timeline-item, .skill-card, .project-card, .achievement-card, .contact-card, .about-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 245, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 245, 255, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Particle effect on skill cards
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        createParticles(this);
    });
});

function createParticles(element) {
    const colors = ['#00f5ff', '#ff00ff', '#ffd700'];
    const particleCount = 10;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const rect = element.getBoundingClientRect();
        particle.style.left = rect.left + Math.random() * rect.width + 'px';
        particle.style.top = rect.top + Math.random() * rect.height + 'px';
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => particle.remove();
    }
}

// Typing effect for tagline
const tagline = document.querySelector('.tagline');
if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// Dynamic skill card color on hover
skillCards.forEach((card, index) => {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];
    
    card.addEventListener('mouseenter', function() {
        const gradient = gradients[index % gradients.length];
        this.style.background = gradient;
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'var(--card-bg)';
    });
});

// Scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.position = 'fixed';
scrollProgress.style.top = '0';
scrollProgress.style.left = '0';
scrollProgress.style.width = '0%';
scrollProgress.style.height = '4px';
scrollProgress.style.background = 'linear-gradient(90deg, #00f5ff, #ff00ff, #ffd700)';
scrollProgress.style.zIndex = '9999';
scrollProgress.style.transition = 'width 0.1s ease';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Add floating animation to timeline icons
const timelineIcons = document.querySelectorAll('.timeline-icon');
timelineIcons.forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out infinite`;
    icon.style.animationDelay = `${index * 0.2}s`;
});

// Cursor trail effect (optional, can be removed if too much)
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

// Create cursor circles if they don't exist
if (circles.length === 0) {
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.position = 'fixed';
        circle.style.width = '10px';
        circle.style.height = '10px';
        circle.style.borderRadius = '50%';
        circle.style.background = 'rgba(0, 245, 255, 0.3)';
        circle.style.pointerEvents = 'none';
        circle.style.zIndex = '9998';
        circle.style.transition = 'all 0.3s ease';
        document.body.appendChild(circle);
    }
}

const allCircles = document.querySelectorAll('.circle');

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
        circle.style.transform = `scale(${(allCircles.length - index) / allCircles.length})`;
        
        const nextCircle = allCircles[index + 1] || allCircles[0];
        x += (nextCircle.offsetLeft - x) * 0.3;
        y += (nextCircle.offsetTop - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();

// Counter animation for achievements
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add active state to nav links on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

console.log('3D Portfolio loaded successfully! 🚀');

// Resume PDF viewer
function openResume() {
    // Resume PDF path from assets folder
    const resumePath = 'assets/Aman Wipro resume.pdf';
    
    // Open in new tab
    window.open(resumePath, '_blank');
}

// Initialize resume button click handler
document.addEventListener('DOMContentLoaded', () => {
    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', openResume);
    }
});

