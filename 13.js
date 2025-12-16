const form = document.getElementById('formLogin');
const mensaje = document.getElementById('mensaje');

// Si ya hay sesión activa
const usuarioLogueado = localStorage.getItem('usuarioLogueado');
if (usuarioLogueado) {
    mensaje.innerHTML = `<div class="mensaje exito">¡Sesión ya activa como <strong>${usuarioLogueado}</strong>!<br><button onclick="cerrarSesion()" style="margin-top:10px; padding:10px; background:#dc3545; color:white; border:none; border-radius:5px; cursor:pointer;">Cerrar Sesión</button></div>`;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('fname').value.trim();
    const password = document.getElementById('password').value;

    // Cargar usuarios registrados
    const lista = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');

    if (lista.length === 0) {
        mensaje.innerHTML = '<div class="mensaje error">No hay usuarios registrados todavía. ¡Regístrate primero!</div>';
        return;
    }

    // Buscar coincidencia
    const encontrado = lista.find(reg =>
        reg.usuario.toLowerCase() === usuario.toLowerCase() &&
        reg.password === password
    );

    if (encontrado) {
        localStorage.setItem('usuarioLogueado', encontrado.usuario);
        mensaje.innerHTML = `<div class="mensaje exito">¡Login correcto! Bienvenido, ${encontrado.usuario} 🚗<br>Redirigiendo...</div>`;
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        mensaje.innerHTML = '<div class="mensaje error">Usuario o contraseña incorrectos.</div>';
    }
});

function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    location.reload();
}