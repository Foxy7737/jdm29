// session.js - Versión SIMPLE y 100% funcional

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (!usuarioLogueado) return;

    // Siempre el último <li> es el de Usuario
    const liUsuario = document.querySelector('nav ul li:last-child');
    if (!liUsuario) return;

    liUsuario.classList.remove('dropdown');
    liUsuario.innerHTML = `
        <a href="Prueba 15.html" style="color:#ff6b00;font-weight:bold;">👤 ${usuarioLogueado}</a>
        <a href="#" id="cerrarSesion" style="margin-left:15px;color:#ff4444;font-size:0.9em;">(Cerrar sesión)</a>
    `;

    document.getElementById('cerrarSesion')?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('usuarioLogueado');
        location.reload();
    });
});

// Perfil solo en Prueba 15.html
if (document.getElementById('contenidoPerfil')) {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const div = document.getElementById('contenidoPerfil');

    if (!usuarioLogueado) {
        div.innerHTML = '<div style="text-align:center;padding:40px;background:#222;border-radius:15px;"><h3 style="color:#ff6b00;">Inicia sesión</h3><a href="Prueba 13.html">Ir al login</a></div>';
    } else {
        const lista = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
        const user = lista.find(u => u.usuario === usuarioLogueado);

        if (user) {
            const intereses = Array.isArray(user.intereses) ? user.intereses.join(', ') : 'Ninguno';
            const fecha = new Date(user.fecha).toLocaleDateString('es-ES');

            div.innerHTML = `
                <div style="background:#222;padding:40px;border-radius:15px;text-align:center;">
                    <h3 style="color:#ff6b00;">¡Hola ${usuarioLogueado}! 🚗</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Nacimiento:</strong> ${user.fechaNac || 'No indicado'}</p>
                    <p><strong>Registrado:</strong> ${fecha}</p>
                    <p><strong>Intereses:</strong> ${intereses}</p>
                    <button onclick="localStorage.removeItem('usuarioLogueado');location.href='index.html'" style="margin-top:20px;padding:12px;background:#dc3545;color:white;border:none;border-radius:8px;">
                        Cerrar Sesión
                    </button>
                </div>
            `;
        }
    }
}

// Audio
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const btn = document.getElementById('audio-toggle');
    if (!audio || !btn) return;

    const muted = localStorage.getItem('audioMuted') === 'true';
    audio.muted = muted;
    btn.textContent = muted ? '🔇 OFF' : '🔊 ON';

    btn.onclick = () => {
        audio.muted = !audio.muted;
        localStorage.setItem('audioMuted', audio.muted);
        btn.textContent = audio.muted ? '🔇 OFF' : '🔊 ON';
        if (!audio.muted) audio.play();
    };
});

function toggleFavorito(item) {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (!usuarioLogueado) return alert('Inicia sesión para guardar favoritos');

    let favoritos = JSON.parse(localStorage.getItem('favoritos_' + usuarioLogueado) || '[]');
    const index = favoritos.indexOf(item);
    if (index > -1) {
        favoritos.splice(index, 1);
        alert('Eliminado de favoritos');
    } else {
        favoritos.push(item);
        alert('¡Añadido a favoritos!');
    }
    localStorage.setItem('favoritos_' + usuarioLogueado, JSON.stringify(favoritos));
}

// Loader solo aparece la primera vez
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('jdmLoader'); // Cambia por el ID de tu loader (driftLoader, nitroLoader, etc.)
    if (!loader) return;

    // Clave para recordar si ya se mostró
    const loaderShownKey = 'jdmLoaderShown';
    const lastShown = localStorage.getItem(loaderShownKey);

    // Opción A: Solo una vez por sesión del navegador (cierra y abre el navegador para verlo de nuevo)
    // const hasShown = sessionStorage.getItem(loaderShownKey);

    // Opción B: Solo una vez al día (recomendada)
    const today = new Date().toDateString();
    const hasShown = lastShown === today;

    if (hasShown) {
        // Ya se mostró hoy → no mostrar loader
        loader.style.display = 'none';
        return;
    }

    // Mostrar loader por primera vez
    loader.style.display = 'flex'; // o 'block' según tu CSS

    // Simular carga (ajusta el tiempo o quítalo si quieres que desaparezca al load real)
    window.addEventListener('load', function () {
        setTimeout(() => {
            loader.classList.add('hidden'); // Usa la clase hidden de tu CSS
            setTimeout(() => {
                loader.style.display = 'none'; // O loader.remove() para borrarlo del DOM
            }, 1000);

            // Guardar que ya se mostró hoy
            localStorage.setItem(loaderShownKey, today);
        }, 3000); // Tiempo del loader (ajusta a tu gusto)
    });
});