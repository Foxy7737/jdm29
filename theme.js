document.addEventListener('DOMContentLoaded', function () {
    const statsContent = document.getElementById('statsContent');
    const lista = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');

    if (lista.length === 0) {
        statsContent.innerHTML = '<p style="color:#666;">Aún no hay usuarios registrados. ¡Sé el primero! 🚗</p>';
        return;
    }

    // Total usuarios
    const totalUsuarios = lista.length;

    // Interés más popular
    let countPeliculas = 0, countVideojuegos = 0, countCoches = 0;
    lista.forEach(user => {
        if (user.intereses.includes('Películas')) countPeliculas++;
        if (user.intereses.includes('Videojuegos')) countVideojuegos++;
        if (user.intereses.includes('Coches')) countCoches++;
    });

    const maxCount = Math.max(countPeliculas, countVideojuegos, countCoches);
    let interesPopular = '';
    if (maxCount === countPeliculas) interesPopular = 'Películas 🎬';
    else if (maxCount === countVideojuegos) interesPopular = 'Videojuegos 🎮';
    else if (maxCount === countCoches) interesPopular = 'Coches JDM 🏎️';
    if (countPeliculas === countVideojuegos && countVideojuegos === countCoches) interesPopular = '¡Todo igual de popular! 🔥';

    // Usuarios registrados hoy
    const hoy = new Date().toDateString();
    const usuariosHoy = lista.filter(user => new Date(user.fecha).toDateString() === hoy).length;

    // Construir mensaje
    let statsHTML = `
        <p><strong>👥 Total de fans registrados:</strong> ${totalUsuarios}</p>
        <p><strong>❤️ Interés más popular:</strong> ${interesPopular} (${maxCount} fans)</p>
      `;

    if (usuariosHoy > 0) {
        statsHTML += `<p><strong>🚀 Nuevos hoy:</strong> ${usuariosHoy} fan${usuariosHoy > 1 ? 's' : ''} se han unido ¡Bienvenidos! 🎉</p>`;
    }

    statsContent.innerHTML = statsHTML;
});