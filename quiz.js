// quiz.js - Quizzes interactivos con corrección y puntuación

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.quiz-form');

    let totalQuestions = forms.length;
    let correctAnswers = 0;
    let answeredQuestions = 0;

    forms.forEach((form, index) => {
        const radios = form.querySelectorAll('input[type="radio"]');

        radios.forEach(radio => {
            radio.addEventListener('change', function () {
                // Evitar responder varias veces la misma pregunta
                if (form.classList.contains('answered')) return;

                form.classList.add('answered');
                answeredQuestions++;

                // Mostrar feedback
                const labels = form.querySelectorAll('label');
                labels.forEach(label => {
                    const input = label.querySelector('input');
                    const feedback = label.querySelector('.feedback');

                    if (input.getAttribute('data-correct') === 'true') {
                        label.style.color = '#00ff00';
                        if (feedback) feedback.textContent = '✅';
                        correctAnswers++;
                    } else {
                        label.style.color = '#ff4444';
                        if (feedback) feedback.textContent = '❌';
                    }

                    // Deshabilitar todos los radios de esta pregunta
                    input.disabled = true;
                });

                // Si ha respondido todas, mostrar resultado
                if (answeredQuestions === totalQuestions) {
                    showFinalScore();
                }
            });
        });
    });

    function showFinalScore() {
        let message = '';
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);

        if (percentage === 100) {
            message = `¡PERFECTO! ${correctAnswers}/${totalQuestions} 🎉<br>Eres un auténtico experto en coches JDM 🚗💨`;
        } else if (percentage >= 80) {
            message = `¡Excelente! ${correctAnswers}/${totalQuestions} 🔥<br>Gran conocimiento, crack`;
        } else if (percentage >= 60) {
            message = `¡Bien! ${correctAnswers}/${totalQuestions} 👍<br>No está mal, sigue así`;
        } else if (percentage >= 40) {
            message = `Ánimo: ${correctAnswers}/${totalQuestions} 😅<br>Hay margen de mejora`;
        } else {
            message = `Vaya... ${correctAnswers}/${totalQuestions} 🤏<br>¡Repasa y vuelve a intentarlo!`;
        }

        // Crear div de resultado (solo una vez)
        if (!document.getElementById('quiz-final-result')) {
            const resultDiv = document.createElement('div');
            resultDiv.id = 'quiz-final-result';
            resultDiv.innerHTML = `
                <h2 style="text-align:center; color:#ff6b00; margin:40px 0 20px;">¡Resultado final!</h2>
                <div style="text-align:center; padding:30px; background:#222; border-radius:15px; font-size:1.4em; color:white;">
                    ${message}
                    <br><br>
                    <button onclick="location.reload()" style="padding:12px 24px; background:#ff6b00; color:white; border:none; border-radius:50px; font-size:1em; cursor:pointer;">
                        Volver a intentarlo
                    </button>
                </div>
            `;
            // Insertar después del último quiz
            const container = document.querySelector('.container') || document.body;
            container.appendChild(resultDiv);
        }
    }
});