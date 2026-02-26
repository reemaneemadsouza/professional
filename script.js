// 1. Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
});

// 2. Counter Logic
const countUp = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 2000;
    let start = 0;
    const step = (target / (duration / 16));

    const update = () => {
        start += step;
        if (start < target) {
            el.innerText = Math.floor(start).toLocaleString();
            requestAnimationFrame(update);
        } else {
            el.innerText = target.toLocaleString();
        }
    };
    update();
};

// 3. Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.count').forEach(countUp);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.observe').forEach(el => observer.observe(el));

// 4. Mobile Dropdown Toggle
document.querySelector('.dropdown-toggle').addEventListener('click', (e) => {
    if (window.innerWidth < 900) {
        const menu = e.currentTarget.nextElementSibling;
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
});
