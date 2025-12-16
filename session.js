// session.js - Versión fija y robusta para todas las páginas

document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');

    // Buscar todos los <li> en la nav
    const navLiItems = document.querySelectorAll('nav ul li');
    let liUsuario = null;

    // Encontrar el <li> que contiene "Usuario" en el texto
    navLiItems.forEach(li => {
        if (li.textContent.trim().includes('Usuario')) {
            liUsuario = li;
        }
    });

    if (!liUsuario) {
        console.log('No se encontró el menú de Usuario. Revisa la consola (F12) para depurar.');
        return;
    }

    if (usuarioLogueado) {
        // Quitar clase dropdown si existe
        liUsuario.classList.remove('dropdown');
        liUsuario.innerHTML = `
    <a href="#" id="cerrarSesion" style="color: #ff6b00; font-weight: bold; text-decoration: none;">
        Bienvenido, <strong>${usuarioLogueado}</strong> | Cerrar sesión
    </a>
`;

        // Reemplazar todo el contenido del <li>
        liUsuario.innerHTML = `
            <a href="#" id="cerrarSesion" style="color: #ff6b00; font-weight: bold; text-decoration: none;">
                Bienvenido, <strong>${usuarioLogueado}</strong> | Cerrar sesión
            </a>
        `;

        // Añadir el evento de cerrar sesión
        const cerrarLink = document.getElementById('cerrarSesion');
        if (cerrarLink) {
            cerrarLink.addEventListener('click', function (e) {
                e.preventDefault();
                if (confirm('¿Quieres cerrar sesión?')) {
                    localStorage.removeItem('usuarioLogueado');
                    location.reload();
                }
            });
        }
    } // No hace nada si no está logueado, deja el HTML original
});

document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const contenido = document.getElementById('contenidoPerfil');

    if (!usuarioLogueado) {
        contenido.innerHTML = `
                    <div class="no-login">
                        <h3>🚫 Acceso restringido</h3>
                        <p>Debes <a href="Prueba 13.html">iniciar sesión</a> para ver tu perfil.</p>
                    </div>
                `;
        return;
    }

    // Cargar todos los registros
    const lista = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');

    // Buscar los datos del usuario logueado
    const misDatos = lista.find(reg => reg.usuario === usuarioLogueado);

    if (!misDatos) {
        contenido.innerHTML = `<p style="color:red;">Error: No se encontraron tus datos.</p>`;
        return;
    }

    // Mostrar perfil bonito
    contenido.innerHTML = `
                <div class="dato">
                    <strong>Usuario:</strong> ${misDatos.usuario}
                </div>
                <div class="dato">
                    <strong>Fecha de nacimiento:</strong> ${misDatos.fechaNac || 'No especificada'}
                </div>
                <div class="dato">
                    <strong>Email:</strong> ${misDatos.email}
                </div>
                <div class="dato">
                    <strong>Registrado el:</strong> ${misDatos.fecha}
                </div>
                <div class="dato">
                    <strong>Mis intereses en la web:</strong><br><br>
                    <ul class="intereses-list">
                        ${misDatos.intereses.map(int => `<li>${int}</li>`).join('')}
                    </ul>
                </div>
                <p style="margin-top:30px;">
                    <a href="index.html" style="color:#ff6b00; font-weight:bold;">← Volver al Inicio</a>
                </p>
            `;
});

document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const contenido = document.getElementById('contenidoPerfil');

    if (!usuarioLogueado) {
        contenido.innerHTML = `
                    <div class="no-login">
                        <h3>🚫 Acceso restringido</h3>
                        <p>Debes <a href="Prueba 13.html">iniciar sesión</a> para ver y editar tu perfil.</p>
                    </div>
                `;
        return;
    }

    // Cargar registros
    let lista = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');

    // Encontrar los datos del usuario
    const indice = lista.findIndex(reg => reg.usuario === usuarioLogueado);
    if (indice === -1) {
        contenido.innerHTML = `<p class="error">Error: No se encontraron tus datos.</p>`;
        return;
    }

    const misDatos = lista[indice];

    // Formulario de edición
    contenido.innerHTML = `
                <form id="formEditarPerfil">
                    <label>Usuario:</label>
                    <input type="text" value="${misDatos.usuario}" disabled style="background:#eee;">

                    <label>Fecha de nacimiento:</label>
                    <input type="date" id="editFechaNac" value="${misDatos.fechaNac || ''}">

                    <label>Correo electrónico:</label>
                    <input type="email" id="editEmail" value="${misDatos.email}" required>

                    <div class="intereses">
                        <p><strong>Mis intereses:</strong></p>
                        <input type="checkbox" id="editInt1" value="Películas" ${misDatos.intereses.includes('Películas') ? 'checked' : ''}>
                        <label for="editInt1">Quiero ver películas</label><br>
                        <input type="checkbox" id="editInt2" value="Videojuegos" ${misDatos.intereses.includes('Videojuegos') ? 'checked' : ''}>
                        <label for="editInt2">Quiero ver videojuegos</label><br>
                        <input type="checkbox" id="editInt3" value="Coches" ${misDatos.intereses.includes('Coches') ? 'checked' : ''}>
                        <label for="editInt3">Quiero ver coches</label><br>
                    </div>

                    <button type="submit">Guardar Cambios</button>
                </form>

                <div id="mensajeEdicion"></div>

                <p style="margin-top:30px; text-align:center;">
                    <a href="index.html" style="color:#ff6b00; font-weight:bold;">← Volver al Inicio</a>
                </p>
            `;

    // Evento guardar cambios
    document.getElementById('formEditarPerfil').addEventListener('submit', function (e) {
        e.preventDefault();

        // Recoger nuevos intereses
        const nuevosIntereses = [];
        if (document.getElementById('editInt1').checked) nuevosIntereses.push('Películas');
        if (document.getElementById('editInt2').checked) nuevosIntereses.push('Videojuegos');
        if (document.getElementById('editInt3').checked) nuevosIntereses.push('Coches');

        if (nuevosIntereses.length === 0) nuevosIntereses.push('Ninguno seleccionado');

        // Actualizar datos
        lista[indice].fechaNac = document.getElementById('editFechaNac').value;
        lista[indice].email = document.getElementById('editEmail').value.trim();
        lista[indice].intereses = nuevosIntereses;

        // Guardar en localStorage
        localStorage.setItem('registrosUsuarios', JSON.stringify(lista));

        document.getElementById('mensajeEdicion').innerHTML = `
                    <div class="mensaje exito">¡Cambios guardados correctamente! ✅</div>
                `;

        // Opcional: recargar para ver cambios limpios
        setTimeout(() => location.reload(), 1500);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const personalizado = document.getElementById('personalizado');

    if (!usuarioLogueado) {
        return; // No muestra nada si no está logueado
    }

    // Cargar datos del usuario
    const lista = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
    const misDatos = lista.find(reg => reg.usuario === usuarioLogueado);

    if (!misDatos || !misDatos.intereses) {
        return;
    }

    let mensajes = [];

    if (misDatos.intereses.includes('Películas')) {
        mensajes.push('🎬 <strong>¡Te encantan las películas de coches!</strong> Mira la sección de Fast & Furious, Gran Turismo y en la sección de peliculas');
    }
    if (misDatos.intereses.includes('Videojuegos')) {
        mensajes.push('🎮 <strong>¡Fan de los videojuegos!</strong> No te pierdas Need for Speed, Gran Turismo y F1 en la sección de Videojuegos 🔥');
    }
    if (misDatos.intereses.includes('Coches')) {
        mensajes.push('🏎️ <strong>¡Amante de los coches JDM!</strong> Echa un vistazo al Nissan GT-R, Toyota Supra y Celica 💨');
    }

    if (mensajes.length === 0) {
        mensajes.push('¡Bienvenido de nuevo! Explora todo el contenido JDM que hemos preparado para ti 🚗');
    }

    // Mostrar los mensajes bonitos
    personalizado.innerHTML = `
        <div style="background: linear-gradient(135deg, #ff6b00, #ff8c00); color: white; padding: 20px; border-radius: 12px; box-shadow: 0 6px 15px rgba(0,0,0,0.3); font-size: 18px;">
          <h3>¡Hola de nuevo, ${usuarioLogueado}! 👋</h3>
          ${mensajes.map(m => `<p style="margin: 15px 0;">${m}</p>`).join('')}
        </div>
      `;
});

document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const contenido = document.getElementById('contenidoPerfil');

    if (!usuarioLogueado) {
        contenido.innerHTML = `
                    <div class="no-login">
                        <h3>🚫 Acceso restringido</h3>
                        <p>Debes <a href="Prueba 13.html">iniciar sesión</a> para ver y editar tu perfil.</p>
                    </div>
                `;
        return;
    }

    let lista = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
    const indice = lista.findIndex(reg => reg.usuario === usuarioLogueado);
    if (indice === -1) {
        contenido.innerHTML = `<p class="error">Error: No se encontraron tus datos.</p>`;
        return;
    }

    const misDatos = lista[indice];

    const avatarDefault = 'Imagenes/logo jdm.png';
    const avatarActual = misDatos.avatar || avatarDefault;

    contenido.innerHTML = `
                <div style="text-align:center; margin-bottom:30px;">
                    <img id="avatarPreview" src="${avatarActual}" style="width:150px; height:150px; object-fit:cover; border-radius:50%; border:5px solid #ff6b00; box-shadow:0 4px 15px rgba(0,0,0,0.3);">
                    <br><br>
                    <input type="file" id="subirAvatar" accept="image/*" style="display:none;">
                    <button onclick="document.getElementById('subirAvatar').click()" style="padding:10px 20px; background:#ff6b00; color:white; border:none; border-radius:6px; cursor:pointer;">
                        Cambiar Foto de Perfil
                    </button>
                </div>

                <form id="formEditarPerfil">
                    <label>Usuario:</label>
                    <input type="text" value="${misDatos.usuario}" disabled style="background:#eee;">

                    <label>Fecha de nacimiento:</label>
                    <input type="date" id="editFechaNac" value="${misDatos.fechaNac || ''}">

                    <label>Correo electrónico:</label>
                    <input type="email" id="editEmail" value="${misDatos.email}" required>

                    <div class="intereses">
                        <p><strong>Mis intereses:</strong></p>
                        <input type="checkbox" id="editInt1" value="Películas" ${misDatos.intereses.includes('Películas') ? 'checked' : ''}>
                        <label for="editInt1">Quiero ver películas</label><br>
                        <input type="checkbox" id="editInt2" value="Videojuegos" ${misDatos.intereses.includes('Videojuegos') ? 'checked' : ''}>
                        <label for="editInt2">Quiero ver videojuegos</label><br>
                        <input type="checkbox" id="editInt3" value="Coches" ${misDatos.intereses.includes('Coches') ? 'checked' : ''}>
                        <label for="editInt3">Quiero ver coches</label><br>
                    </div>

                    <button type="submit">Guardar Cambios</button>
                </form>

                <div id="mensajeEdicion"></div>

                <!-- Cambiar contraseña -->
                <div style="margin-top:50px; padding:20px; background:#f8f9fa; border-radius:8px;">
                    <h3 style="color:#ff6b00; text-align:center;">🔑 Cambiar Contraseña</h3>
                    <form id="formCambiarPassword">
                        <label>Contraseña actual:</label>
                        <input type="password" id="oldPassword" required>

                        <label>Nueva contraseña:</label>
                        <input type="password" id="newPassword1" required>

                        <label>Repite nueva contraseña:</label>
                        <input type="password" id="newPassword2" required>

                        <button type="submit" style="margin-top:15px;">Cambiar Contraseña</button>
                    </form>
                    <div id="mensajePassword"></div>
                </div>

                <!-- Borrar mi cuenta (ya lo tenías) -->
                <div style="margin-top:50px; text-align:center;">
                    <button id="borrarCuenta" style="background:#dc3545; padding:12px 24px; color:white; border:none; border-radius:6px; cursor:pointer; font-size:16px;">
                        🗑️ Borrar mi cuenta permanentemente
                    </button>
                    <p style="font-size:0.9em; color:#999; margin-top:10px;">
                        Esta acción no se puede deshacer.
                    </p>
                </div>

                <p style="margin-top:30px; text-align:center;">
                    <a href="index.html" style="color:#ff6b00; font-weight:bold;">← Volver al Inicio</a>
                </p>
            `;

    // Subir avatar
    document.getElementById('subirAvatar').addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen es muy grande (máx 5MB)');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            const base64 = event.target.result;
            lista[indice].avatar = base64;
            localStorage.setItem('registrosUsuarios', JSON.stringify(lista));
            document.getElementById('avatarPreview').src = base64;
            alert('¡Foto de perfil actualizada! 🚗');
        };
        reader.readAsDataURL(file);
    });

    // Guardar cambios normales
    document.getElementById('formEditarPerfil').addEventListener('submit', function (e) {
        e.preventDefault();
        const nuevosIntereses = [];
        if (document.getElementById('editInt1').checked) nuevosIntereses.push('Películas');
        if (document.getElementById('editInt2').checked) nuevosIntereses.push('Videojuegos');
        if (document.getElementById('editInt3').checked) nuevosIntereses.push('Coches');
        if (nuevosIntereses.length === 0) nuevosIntereses.push('Ninguno seleccionado');

        lista[indice].fechaNac = document.getElementById('editFechaNac').value;
        lista[indice].email = document.getElementById('editEmail').value.trim();
        lista[indice].intereses = nuevosIntereses;

        localStorage.setItem('registrosUsuarios', JSON.stringify(lista));
        document.getElementById('mensajeEdicion').innerHTML = `<div class="mensaje exito">¡Cambios guardados correctamente! ✅</div>`;
        setTimeout(() => location.reload(), 1500);
    });

    // Cambiar contraseña
    document.getElementById('formCambiarPassword').addEventListener('submit', function (e) {
        e.preventDefault();

        const oldPass = document.getElementById('oldPassword').value;
        const newPass1 = document.getElementById('newPassword1').value;
        const newPass2 = document.getElementById('newPassword2').value;

        const msg = document.getElementById('mensajePassword');

        if (oldPass !== misDatos.password) {
            msg.innerHTML = `<div class="mensaje error">Contraseña actual incorrecta.</div>`;
            return;
        }

        if (newPass1 !== newPass2) {
            msg.innerHTML = `<div class="mensaje error">Las nuevas contraseñas no coinciden.</div>`;
            return;
        }

        if (newPass1.length < 4) {
            msg.innerHTML = `<div class="mensaje error">La nueva contraseña debe tener al menos 4 caracteres.</div>`;
            return;
        }

        // Actualizar contraseña
        lista[indice].password = newPass1;
        localStorage.setItem('registrosUsuarios', JSON.stringify(lista));

        msg.innerHTML = `<div class="mensaje exito">¡Contraseña cambiada correctamente! 🔒</div>`;
        document.getElementById('formCambiarPassword').reset();
    });

    // Borrar mi cuenta (ya lo tenías)
    document.getElementById('borrarCuenta').addEventListener('click', function () {
        const confirm1 = confirm('¿Estás completamente seguro de que quieres borrar tu cuenta? Esta acción NO se puede deshacer.');
        if (!confirm1) return;

        const nombre = prompt('Para confirmar, escribe tu nombre de usuario exactamente:');
        if (nombre !== usuarioLogueado) {
            alert('Nombre de usuario incorrecto. Operación cancelada.');
            return;
        }

        lista.splice(indice, 1);
        localStorage.setItem('registrosUsuarios', JSON.stringify(lista));
        localStorage.removeItem('usuarioLogueado');

        alert('Tu cuenta ha sido borrada permanentemente. ¡Gracias por haber sido parte de la comunidad JDM! 😢🚗');
        window.location.href = 'Prueba 13.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('background-audio');
    const toggleBtn = document.getElementById('audio-toggle');

    if (!audio || !toggleBtn) return;

    // Estado guardado en localStorage para que recuerde la preferencia
    const muted = localStorage.getItem('audioMuted') === 'true';
    audio.muted = muted;
    toggleBtn.textContent = muted ? '🔇 Música OFF' : '🔊 Música ON';
    toggleBtn.classList.toggle('muted', muted);

    if (!muted) {
        audio.play().catch(() => {
            // Algunos navegadores bloquean play() sin interacción
            toggleBtn.textContent = '🔇 Música OFF (click para activar)';
        });
    }

    toggleBtn.addEventListener('click', function () {
        audio.muted = !audio.muted;
        localStorage.setItem('audioMuted', audio.muted);
        toggleBtn.textContent = audio.muted ? '🔇 Música OFF' : '🔊 Música ON';
        toggleBtn.classList.toggle('muted', audio.muted);

        if (!audio.muted) {
            audio.play();
        }
    });
});