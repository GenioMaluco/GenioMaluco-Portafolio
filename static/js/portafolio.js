class PortfolioVisualizer {
    constructor() {
        this.skillsCache = null;
        this.profileImg = document.getElementById('profile-img');
        this.skillsContainer = document.getElementById('skills-visualization');
        
        // Debug inicial
        console.log("Elementos cargados:", {
            profileImg: this.profileImg,
            skillsContainer: this.skillsContainer
        });

        if (this.profileImg && this.skillsContainer) {
            this.setupEventListeners();
        } else {
            console.error("No se encontraron los elementos necesarios en el DOM");
        }
    }

    setupEventListeners() {
        this.profileImg.addEventListener('click', async (e) => {
            e.stopPropagation();
            
            if (this.profileImg.classList.contains('profile-minimized')) {
                this.hideSkillsVisualization();
            } else {
                await this.showSkillsVisualization();
            }
        });
    }

    async showSkillsVisualization() {
        try {
            console.log("Iniciando visualización de habilidades...");
            this.profileImg.classList.add('profile-minimized');
            
            const skills = await this.fetchSkills();
            console.log("Habilidades obtenidas:", skills); // Debug
            
            if (!skills || skills.length === 0) {
                console.warn("No se recibieron habilidades o el array está vacío");
                return;
            }
            
            this.createSkillsVisualization(skills);
            this.skillsContainer.classList.add('visible');
            
        } catch (error) {
            console.error("Error en showSkillsVisualization:", error);
        }
    }

    hideSkillsVisualization() {
        this.profileImg.classList.remove('profile-minimized');
        this.skillsContainer.classList.remove('visible');
        this.skillsContainer.innerHTML = '';
    }

    async fetchSkills() {
        try {
            console.log("Obteniendo habilidades desde la API...");
            const response = await fetch('/api/habilidades');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const skills = await response.json();
            console.log("Datos crudos de la API:", skills); // Debug
            
            return skills;
            
        } catch (error) {
            console.error("Error al obtener habilidades:", error);
            return [];
        }
    }

    async createSkillsVisualization() {
        const response = await this.fetchSkills();
        const { tipos, detalles } = response;
        
        // Ajusta el contenedor principal
        document.querySelector('.container-perfil').classList.add('expanded');
        
        // Posicionamiento
        const profileImg = document.getElementById('profile-img');
        const imgRect = profileImg.getBoundingClientRect();
        const centerX = imgRect.left + imgRect.width / 2;
        const centerY = imgRect.top + imgRect.height / 2;
        
        // Radio basado en el tamaño de pantalla
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.25;
        
        // Limpia el contenedor
        this.skillsContainer.innerHTML = '';
        
        // Crea burbujas para cada tipo
        tipos.forEach((tipoObj, index) => {
            const angle = (index * 2 * Math.PI) / tipos.length;
            const bubbleX = centerX + radius * Math.cos(angle);
            const bubbleY = centerY + radius * Math.sin(angle);
            
            // Filtra habilidades por tipo
            const habilidadesTipo = detalles.filter(h => h.tipo === tipoObj.tipo);
            
            // Crea la línea
            this.createSkillLine(centerX, centerY, bubbleX, bubbleY);
            
            // Crea la burbuja
            this.createSkillBubble(
                bubbleX, 
                bubbleY, 
                tipoObj.tipo,
                habilidadesTipo
            );
        });
    }

    createSkillLine(startX, startY, endX, endY) {
        const line = document.createElement('div');
        line.className = 'skill-line';
        
        // Cálculo de longitud y ángulo
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX);
        
        line.style.cssText = `
            position: absolute;
            left: ${startX}px;
            top: ${startY}px;
            width: ${length}px;
            height: 2px;
            background: linear-gradient(to right, #3498db, #2ecc71);
            transform: rotate(${angle}rad);
            transform-origin: 0 0;
            z-index: 1;
        `;
        
        this.skillsContainer.appendChild(line);
    }

    createSkillBubble(x, y, tipo, habilidades) {
        const bubble = document.createElement('div');
        bubble.className = 'skill-bubble';
        bubble.dataset.tipo = tipo;
        
        bubble.innerHTML = `
            <div class="skill-type">${tipo}</div>
            <div class="skill-details" style="display:none">
                ${habilidades.map(h => `
                    <div class="skill-item">
                        <span class="skill-name">${h.nombre}</span>
                        <span class="skill-level">${h.nivel}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        bubble.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
        `;
        
        // Eventos hover
        bubble.addEventListener('mouseenter', () => {
            bubble.querySelector('.skill-details').style.display = 'block';
            bubble.classList.add('expanded');
        });
        
        bubble.addEventListener('mouseleave', () => {
            bubble.querySelector('.skill-details').style.display = 'none';
            bubble.classList.remove('expanded');
        });
        
        this.skillsContainer.appendChild(bubble);
    }
}

// Inicialización con verificación de errores
try {
    document.addEventListener('DOMContentLoaded', () => {
        console.log("DOM completamente cargado, iniciando PortfolioVisualizer...");
        new PortfolioVisualizer();
    });
} catch (error) {
    console.error("Error al inicializar PortfolioVisualizer:", error);
}