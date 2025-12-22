function guardarComentario() {
    const comentario = document.getElementById('comentario').value.trim();
    if (!comentario) return alert('¡Escribe algo!');

    let comentarios = JSON.parse(localStorage.getItem('comentarios_' + window.location.pathname) || '[]');
    comentarios.push({ texto: comentario, fecha: new Date().toLocaleDateString('es-ES') });
    localStorage.setItem('comentarios_' + window.location.pathname, JSON.stringify(comentarios));

    document.getElementById('comentario').value = '';
    mostrarComentarios();
}

function mostrarComentarios() {
    const div = document.getElementById('listaComentarios');
    let comentarios = JSON.parse(localStorage.getItem('comentarios_' + window.location.pathname) || '[]');
    div.innerHTML = comentarios.map(c => `<p style="color: #ccc; margin: 10px 0;"><em>${c.fecha}:</em> ${c.texto}</p>`).join('');
}

mostrarComentarios(); // Carga al inicio