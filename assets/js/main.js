// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Portfolio Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('active', 'bg-primary', 'text-white');
            b.classList.add('text-gray-600', 'hover:text-primary');
        });
        
        btn.classList.add('active', 'bg-primary', 'text-white');
        btn.classList.remove('text-gray-600', 'hover:text-primary');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                item.classList.add('animate__animated', 'animate__fadeInUp');
            } else if (item.classList.contains(filterValue)) {
                item.style.display = 'block';
                item.classList.add('animate__animated', 'animate__fadeInUp');
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Set initial active filter
filterBtns[0].classList.add('bg-primary', 'text-white');

// Back to Top Button Functionality
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Initialize back to top button styles
backToTopBtn.style.opacity = '0';
backToTopBtn.style.visibility = 'hidden';
backToTopBtn.style.transition = 'all 0.3s ease';

// Contact Form Functionality
const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('btn-send-email');

sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const subject = document.getElementById('inputSubject').value;
    const message = document.getElementById('InputTextarea').value;

    if (name && email && subject && message) {
        // Disable button and show loading state
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        sendBtn.disabled = true;
        
        // Create form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);

        // Send to PHP backend
        fetch('assets/php/sendemail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Success
                sendBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
                sendBtn.classList.remove('bg-primary', 'hover:bg-gray-700');
                sendBtn.classList.add('bg-green-500');

                // Reset form
                contactForm.reset();
            } else {
                // Server returned error
                sendBtn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>' + (data.message || 'Error occurred');
                sendBtn.classList.remove('bg-primary', 'hover:bg-gray-700');
                sendBtn.classList.add('bg-red-500');
            }

            // Reset button after 3 seconds
            setTimeout(() => {
                sendBtn.innerHTML = 'Get in touch';
                sendBtn.disabled = false;
                sendBtn.classList.remove('bg-green-500', 'bg-red-500');
                sendBtn.classList.add('bg-primary', 'hover:bg-gray-700');
            }, 3000);
        })
        .catch(error => {
            console.error('Error:', error);
            sendBtn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Error occurred';
            sendBtn.classList.remove('bg-primary', 'hover:bg-gray-700');
            sendBtn.classList.add('bg-red-500');

            // Reset button after 3 seconds
            setTimeout(() => {
                sendBtn.innerHTML = 'Get in touch';
                sendBtn.disabled = false;
                sendBtn.classList.remove('bg-red-500');
                sendBtn.classList.add('bg-primary', 'hover:bg-gray-700');
            }, 3000);
        });
    } else {
        alert('Please fill in all fields.');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio Modal Functionality
const portfolioModal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalCounter = document.getElementById('modalCounter');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let currentIndex = 0;
let portfolioData = [];

// Collect all portfolio items
function initPortfolioModal() {
    const items = document.querySelectorAll('[data-portfolio-item]');
    portfolioData = Array.from(items).map(item => ({
        image: item.dataset.image,
        title: item.dataset.title,
        description: item.dataset.description
    }));

    // Add click handlers to portfolio items
    items.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });
}

function openModal(index) {
    currentIndex = index;
    updateModalContent();
    portfolioModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    portfolioModal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateModalContent() {
    const item = portfolioData[currentIndex];
    
    // Add loading animation
    modalImage.classList.add('loading');
    
    // Update content
    modalImage.src = item.image;
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    modalCounter.textContent = `${currentIndex + 1} / ${portfolioData.length}`;
    
    // Remove loading animation when image loads
    modalImage.onload = () => {
        modalImage.classList.remove('loading');
    };
}

function nextImage() {
    modalImage.classList.add('slide-in-right');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % portfolioData.length;
        updateModalContent();
        modalImage.classList.remove('slide-in-right');
    }, 150);
}

function prevImage() {
    modalImage.classList.add('slide-in-left');
    setTimeout(() => {
        currentIndex = currentIndex === 0 ? portfolioData.length - 1 : currentIndex - 1;
        updateModalContent();
        modalImage.classList.remove('slide-in-left');
    }, 150);
}

// Modal Event Listeners
modalClose.addEventListener('click', closeModal);
modalNext.addEventListener('click', nextImage);
modalPrev.addEventListener('click', prevImage);

// Close modal when clicking outside
portfolioModal.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
        closeModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (!portfolioModal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowRight':
            nextImage();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

modalImage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

modalImage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextImage(); // Swipe left - next image
        } else {
            prevImage(); // Swipe right - previous image
        }
    }
}

// Initialize the modal system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPortfolioModal();
});
