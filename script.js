// script.js

// 1. Scroll Reveal Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Triggers when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'visible' class to trigger CSS transitions
            entry.target.classList.add('visible');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Grab all elements with the 'observe' class and watch them
document.querySelectorAll('.observe').forEach(element => {
    observer.observe(element);
});


// 2. Handle Contact Form Submission to Backend
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        // Show loading state
        const btn = contactForm.querySelector('button');
        const originalBtnText = btn.innerHTML;
        btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                formStatus.innerHTML = `<span style="color: #4ade80;"><i class="fas fa-check-circle"></i> Message sent successfully!</span>`;
                contactForm.reset(); 
            } else {
                formStatus.innerHTML = `<span style="color: #f87171;">Error sending message.</span>`;
            }
        } catch (error) {
            console.error('Error:', error);
            formStatus.innerHTML = `<span style="color: #f87171;">Server offline. Form submitted locally.</span>`;
        }
        
        // Restore button and clear message
        btn.innerHTML = originalBtnText;
        setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
    });
}
