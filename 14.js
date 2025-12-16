const form = document.getElementById('formRegistro');
const contenedor = document.getElementById('registrosGuardados');
const contador = document.getElementById('contador');
const listaRegistros = document.getElementById('listaRegistros');

// Usuario administrador (cámbialo si quieres otro)
const ADMIN_USUARIO = "Foxy7737";  // ← Tu nombre de usuario admin
const ADMIN_PASSWORD = "nissangtrr34";  // ← Tu contraseña admin

// Cargar y mostrar registros al abrir la página (solo si es admin)
mostrarRegistrosSiAdmin();

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (document.getElementById('password1').value !== document.getElementById('password2').value) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return;
    }

    const interesesChecks = document.querySelectorAll('input[name="intereses"]:checked');
    const intereses = Array.from(interesesChecks).map(check => check.value);

    const registro = {
        fecha: new Date().toLocaleString(),
        usuario: document.getElementById('fname').value.trim(),
        fechaNac: document.getElementById('fechaNac').value,
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password1').value,
        intereses: intereses.length > 0 ? intereses : ['Ninguno seleccionado'],
        avatar: ''  // Por si quieres avatars también aquí en el futuro
    };

    let lista = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
    lista.unshift(registro);
    localStorage.setItem('registrosUsuarios', JSON.stringify(lista));

    mostrarRegistrosSiAdmin();
    form.reset();
    alert('¡Registro guardado correctamente!');
});

function mostrarRegistrosSiAdmin() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    let lista = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');

    const esAdmin = usuarioLogueado && lista.some(reg =>
        reg.usuario === usuarioLogueado &&
        reg.usuario === ADMIN_USUARIO &&
        reg.password === ADMIN_PASSWORD
    );

    if (esAdmin) {
        contador.textContent = lista.length;

        if (lista.length === 0) {
            contenedor.innerHTML = '<p style="color:#666;">Aún no hay usuarios registrados.</p>';
        } else {
            contenedor.innerHTML = lista.map((r, index) => `
                <div class="user-card">
                    <p><strong>Fecha:</strong> ${r.fecha}</p>
                    <p><strong>Usuario:</strong> ${r.usuario}</p>
                    <p><strong>Fecha de Nacimiento:</strong> ${r.fechaNac}</p>
                    <p><strong>Email:</strong> ${r.email}</p>
                    <p><strong>Intereses:</strong> ${r.intereses.join(', ')}</p>
                    <button onclick="borrarUsuario(${index})" style="background:#dc3545; color:white; border:none; padding:8px 16px; border-radius:5px; cursor:pointer;">Borrar</button>
                </div>
            `).join('');
        }

        // Botón de exportar (asumiendo que estaba en el código truncado)
        const exportButton = document.createElement('button');
        exportButton.textContent = '📥 Exportar Backup (JSON)';
        exportButton.style = 'margin:20px 0; padding:12px 24px; background:#28a745; color:white; border:none; border-radius:6px; cursor:pointer; font-size:16px;';
        exportButton.onclick = function () {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(lista, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            const today = new Date().toISOString().slice(0, 10);
            downloadAnchor.setAttribute("download", `backup_usuarios_jdm_${today}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            document.body.removeChild(downloadAnchor);
            alert('¡Backup descargado correctamente! 📥');
        };
        listaRegistros.appendChild(exportButton);

    } else {
        listaRegistros.style.display = 'none';
    }
}

// Función para borrar un usuario individual
function borrarUsuario(index) {
    if (confirm('¿Estás seguro de que quieres borrar este usuario? Esta acción no se puede deshacer.')) {
        let lista = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
        const usuarioBorrado = lista.splice(index, 1)[0]; // Borra y guarda el nombre

        localStorage.setItem('registrosUsuarios', JSON.stringify(lista));

        // Si el usuario borrado era el que estaba logueado, cerrar sesión
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        if (usuarioLogueado === usuarioBorrado.usuario) {
            localStorage.removeItem('usuarioLogueado');
            alert('Has borrado tu propia cuenta. Cerrando sesión...');
            setTimeout(() => location.href = 'Prueba 13.html', 1500);
        }

        mostrarRegistrosSiAdmin();
        alert('Usuario borrado correctamente.');
    }
}

// Botón borrar todos (ya lo tenías)
function borrarTodos() {
    if (confirm('¿Estás seguro de que quieres borrar TODOS los usuarios? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('registrosUsuarios');
        localStorage.removeItem('usuarioLogueado'); // Por si el admin se borra a sí mismo
        mostrarRegistrosSiAdmin();
        alert('Todos los usuarios han sido borrados.');
    }
}