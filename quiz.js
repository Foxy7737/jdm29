// quiz.js - Quizzes con respuestas ocultas (solo admin ve correctas desde inicio)

document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const esLogueado = !!usuarioLogueado;  // Verdadero si hay cualquier usuario logueado

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const radios = form.querySelectorAll('input[type="radio"]');

        if (esLogueado) {
            // Para usuarios logueados, mostrar correctas desde el principio
            radios.forEach(radio => {
                const label = radio.parentNode;
                const feedback = document.createElement('span');
                feedback.className = 'feedback';
                label.appendChild(feedback);

                if (radio.getAttribute('data-correct') === 'true') {
                    feedback.textContent = '✅';
                    label.style.color = '#00ff00';
                } else {
                    feedback.textContent = '❌';
                    label.style.color = '#ff4444';
                }
            });
        } else {
            // Para no logueados: esconder hasta responder
            radios.forEach(radio => {
                radio.addEventListener('change', function () {
                    if (form.classList.contains('answered')) return;

                    form.classList.add('answered');

                    radios.forEach(r => {
                        const label = r.parentNode;
                        const feedback = document.createElement('span');
                        feedback.className = 'feedback';
                        label.appendChild(feedback);

                        if (r.getAttribute('data-correct') === 'true') {
                            feedback.textContent = '✅';
                            label.style.color = '#00ff00';
                        } else {
                            feedback.textContent = '❌';
                            label.style.color = '#ff4444';
                        }
                        r.disabled = true;
                    });
                    // Calcular puntuación
                    let correctas = 0;
                    const totalPreguntas = document.querySelectorAll('form.quiz-form').length;

                    document.querySelectorAll('form.quiz-form').forEach(form => {
                        const seleccionado = form.querySelector('input[type="radio"]:checked');
                        if (seleccionado && seleccionado.getAttribute('data-correct') === 'true') {
                            correctas++;
                        }
                    });

                    // Mostrar resultado final
                    if (document.querySelectorAll('form.answered').length === totalPreguntas) {
                        const mensajeFinal = document.createElement('div');
                        mensajeFinal.style = 'margin: 40px auto; padding: 20px; background: #222; border-radius: 15px; max-width: 500px; text-align: center; font-size: 1.4em;';
                        mensajeFinal.innerHTML = `
        <strong>¡Quiz completado!</strong><br>
        Has acertado <span style="color: #00ff00;">${correctas}</span> de ${totalPreguntas}<br><br>
        ${correctas === totalPreguntas ? '🎉 ¡Perfecto! Eres un experto JDM' : '¡Sigue practicando! 🚗'}
    `;
                        document.querySelector('.quiz-container')?.appendChild(mensajeFinal);
                    }
                });
            });
        }
    });
});

// Guarda puntuación por usuario
const usuario = localStorage.getItem('usuarioLogueado');
if (usuario) {
    let scores = JSON.parse(localStorage.getItem('quizScores_' + usuario) || '{}');
    scores[window.location.pathname] = { score: correctas, total: totalPreguntas, fecha: new Date().toLocaleDateString() };
    localStorage.setItem('quizScores_' + usuario, JSON.stringify(scores));
}