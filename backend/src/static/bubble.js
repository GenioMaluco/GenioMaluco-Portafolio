document.addEventListener('DOMContentLoaded', async () => {
    const profileImg = document.getElementById('profileImage');
    const bubblesContainer = document.getElementById('bubblesContainer');
    const proyectosSection = document.getElementById('proyectosSection');

    // 1. Cargar datos de las APIs
    const [habilidadesRes, proyectosRes] = await Promise.all([
        fetch('/api/habilidades'),
        fetch('/api/proyectos')
    ]);
    
    const { blandas, tecnicas } = await habilidadesRes.json();
    const proyectos = await proyectosRes.json();

    // 2. Posicionar burbujas alrededor de la imagen
    function crearBurbuja(data, angulo, radio, tipo) {
        const bubble = document.createElement('div');
        bubble.className = `bubble ${tipo}`;
        
        // Posicionamiento circular
        const x = Math.cos(angulo) * radio;
        const y = Math.sin(angulo) * radio;
        
        bubble.style.left = `calc(50% + ${x}px)`;
        bubble.style.top = `calc(50% + ${y}px)`;
        bubble.textContent = data.nombre;
        
        // Tooltip con más info
        bubble.title = `Nivel: ${data.nivel}%`;
        bubblesContainer.appendChild(bubble);
    }

    // 3. Distribuir habilidades
    blandas.forEach((hab, i) => {
        const angulo = (i / blandas.length) * Math.PI * 2;
        crearBurbuja(hab, angulo, 150, 'blanda');
    });

    tecnicas.forEach((tec, i) => {
        const angulo = (i / tecnicas.length) * Math.PI * 2;
        crearBurbuja(tec, angulo, 220, 'tecnica');
    });

    // 4. Mostrar proyectos
    proyectos.forEach(proyecto => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${proyecto.titulo}</h3>
                        <p>Tecnologías: ${proyecto.tecnologias.join(', ')}</p>`;
        proyectosSection.appendChild(div);
    });
});