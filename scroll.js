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
// scroll.js - Animaciones y botón volver arriba

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btnVolverArriba');

    // Mostrar/ocultar botón al hacer scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    // Scroll suave al pulsar
    btn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

window.addEventListener('load', function () {
    const loader = document.getElementById('jdmLoader');
    if (loader) {
        setTimeout(() => { // Simula carga, quita si quieres instantáneo
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 800);
        }, 2000); // Tiempo de simulación (ajusta o quita)
    }
});