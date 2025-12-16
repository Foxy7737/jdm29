// Animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.scroll, .personal, .favoritos, .opinion-visual');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('fade-in');
    });
});