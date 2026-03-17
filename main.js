// Simple scrollspy to highlight active nav link
document.addEventListener('DOMContentLoaded', () => {

    const navLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
    const sections = navLinks
        .map(a => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);

    if (sections.length === 0) return;

    const byId = new Map(sections.map(s => ["#" + s.id, s]));

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = "#" + entry.target.id;
            const link = navLinks.find(a => a.getAttribute('href') === id);
            if (!link) return;
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -60% 0px',
        threshold: 0.25
    });

    sections.forEach(sec => io.observe(sec));
});