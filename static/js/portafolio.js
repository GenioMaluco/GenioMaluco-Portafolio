class PortfolioVisualizer {
    constructor() {
        this.skillsCache = null;
        this.profileImg = document.getElementById('profile-img');
        this.skillsContainer = document.getElementById('skills-visualization');
        
        if (this.profileImg && this.skillsContainer) {
            this.setupEventListeners();
        } else {
            console.error("No se encontraron los elementos necesarios en el DOM");
        }
    }

    setupEventListeners() {
        this.profileImg.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSkillsVisualization();
        });
    }

    async toggleSkillsVisualization() {
        if (this.skillsContainer.classList.contains('visible')) {
            this.hideSkillsVisualization();
        } else {
            await this.showSkillsVisualization();
        }
    }

    async showSkillsVisualization() {
        try {
            const skills = await this.fetchSkills();
            if (!skills || !skills.tipos || skills.tipos.length === 0) {
                console.warn("No se recibieron habilidades válidas");
                return;
            }
            
            this.createSkillsVisualization(skills);
            this.skillsContainer.classList.add('visible');
            document.querySelector('.container-perfil').classList.add('expanded');
        } catch (error) {
            console.error("Error en showSkillsVisualization:", error);
        }
    }

    hideSkillsVisualization() {
        this.skillsContainer.classList.remove('visible');
        document.querySelector('.container-perfil').classList.remove('expanded');
        this.skillsContainer.innerHTML = '';
    }

    async fetchSkills() {
        try {
            const response = await fetch('/api/habilidades');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Error al obtener habilidades:", error);
            return { tipos: [], detalles: [] };
        }
    }

    createSkillsVisualization(skills) {
        const { tipos, detalles } = skills;
        const imgRect = this.profileImg.getBoundingClientRect();
        const centerX = imgRect.left + imgRect.width / 2;
        const centerY = imgRect.top + imgRect.height / 2;
        const radius = 180;
        
        // 4 direcciones cardinales
        const angles = [0, Math.PI/2, Math.PI, 3*Math.PI/2];
        
        this.skillsContainer.innerHTML = '';
        
        tipos.slice(0, 4).forEach((tipoObj, index) => {
            const angle = angles[index];
            const bubbleX = centerX + radius * Math.cos(angle);
            const bubbleY = centerY + radius * Math.sin(angle);
            
            this.createSkillLine(centerX, centerY, bubbleX, bubbleY);
            this.createSkillBubble(
                bubbleX, 
                bubbleY, 
                tipoObj.tipo, 
                detalles.filter(h => h.tipo === tipoObj.tipo),
                index
            );
        });
    }

    createSkillLine(startX, startY, endX, endY) {
        const line = document.createElement('div');
        line.className = 'skill-line';
        
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX);
        
        line.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            width: ${length}px;
            height: 2px;
            background: linear-gradient(to right, #3498db, #2ecc71);
            transform: rotate(${angle}rad);
            transform-origin: 0 0;
            z-index: 1;
            opacity: 0;
            transition: all 0.5s ease-out;
        `;
        
        this.skillsContainer.appendChild(line);
        
        // Animación
        setTimeout(() => {
            line.style.opacity = '1';
        }, 50);
    }

    createSkillBubble(x, y, tipo, habilidades, index) {
        const bubbleContainer = document.createElement('div');
        bubbleContainer.className = 'skill-bubble-container';
        
        bubbleContainer.innerHTML = `
            <div class="skill-bubble"></div>
            <div class="skill-type-label">${tipo}</div>
            <div class="skill-details">
                ${habilidades.map(h => `
                    <div class="skill-item">
                        <span class="skill-name">${h.nombre}</span>
                        <span class="skill-level">${h.nivel}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        bubbleContainer.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            opacity: 0;
            transition: all 0.5s ease-out ${index * 0.1}s;
            z-index: 10;
        `;
        
        // Eventos hover
        const bubble = bubbleContainer.querySelector('.skill-bubble');
        const details = bubbleContainer.querySelector('.skill-details');
        
        bubble.addEventListener('mouseenter', () => {
            details.style.display = 'block';
        });
        
        bubble.addEventListener('mouseleave', () => {
            details.style.display = 'none';
        });
        
        this.skillsContainer.appendChild(bubbleContainer);
        
        // Animación
        setTimeout(() => {
            bubbleContainer.style.opacity = '1';
        }, 50 + (index * 100));
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioVisualizer();
});