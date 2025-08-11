USE PERSONAL

--DROP TABLE Proyectos
--DROP TABLE Habilidades
--DROP TABLE Persona

CREATE TABLE Persona (
    Cedula INT PRIMARY KEY IDENTITY(1,1),
    nombre_completo NVARCHAR(100) NOT NULL,
    titulo_profesional NVARCHAR(100) NOT NULL,  -- Ej: "Desarrollador Full Stack"
    foto_url NVARCHAR(255),                     -- Ruta a tu foto profesional
    email NVARCHAR(100) NOT NULL,
    telefono NVARCHAR(20),
    ubicacion NVARCHAR(100),                    -- Ej: "Ciudad, País"
    linkedin_url NVARCHAR(255),
    github_url NVARCHAR(255),
    sitio_web NVARCHAR(255),                    -- Ej: "geniomaluco.com"
    resumen TEXT NOT NULL,                      -- Descripción breve (about me)
    fecha_nacimiento DATE,                      -- Opcional para cálculos de edad
    idiomas NVARCHAR(200)                   -- 1 = Disponible para trabajar
)

CREATE TABLE Habilidades (
    id INT PRIMARY KEY IDENTITY,
    tipo VARCHAR(20) CHECK (tipo IN ('blanda', 'tecnica', 'herramienta', 'lenguaje')),
    persona_id INT FOREIGN KEY REFERENCES Persona(Cedula),
    nombre VARCHAR(50) NOT NULL,
    nivel TINYINT,
    categoria VARCHAR(30) NULL,
    icono VARCHAR(100) NULL
);

CREATE TABLE Proyectos (
    id INT PRIMARY KEY IDENTITY,
    persona_id INT FOREIGN KEY REFERENCES Persona(Cedula),
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    url VARCHAR(255),
    tags VARCHAR(255)
);

  -- Ejemplo inserción
INSERT INTO Habilidades (tipo, nombre, nivel, categoria, icono)
VALUES 
('blanda', 'Gestión de Proyectos', 90, NULL, NULL),
('blanda', 'Resolución de problemas', 98, NULL, NULL),
('blanda', 'Trabajo en equipo', 100, NULL, NULL),
('blanda', 'Comunicación Técnica', 90, NULL, NULL),
('blanda', 'Gestión del tiempo', 80, NULL, NULL),
('herramienta', 'Power BI', 100, 'Visualización', NULL),
('herramienta', 'Power Apps', 95, 'DevOps', NULL),
('herramienta', 'Power Automate', 95, 'Automatizacón', NULL),
('herramienta', 'MSSQL', 75, 'Base de datos', NULL),
('herramienta', 'Visual Studio', 95, 'IDE', NULL),
('herramienta', 'Docker', 50, 'Despliegue', NULL),
('lenguaje', 'HTML5', 92, 'Mid-Dev', NULL),
('lenguaje', 'C#', 35, 'Junior', NULL),
('lenguaje', 'Java', 92, 'Mid-Dev', NULL),
('lenguaje', 'SQL', 92, 'Full-Stack', NULL),
('lenguaje', 'Python', 92, 'Full-Stack', NULL)

  -- Ejemplo inserción tabla personas
INSERT INTO Persona (
    nombre_completo, 
    titulo_profesional, 
    foto_url, 
    email, 
    linkedin_url, 
    github_url,
    sitio_web,
    resumen,
    idiomas
) VALUES (
    'Adrian Araya Aguilar',
    'Ingeniero de Software | Especialista en Power Platform',
    null,
    'adrian.arayaaguilar@gmail.com',
    'https://www.linkedin.com/in/adrianarayaaguilar/',
    'https://github.com/GenioMaluco',
    'https://geniomaluco.com',
    'Desarrollador con 5+ años de experiencia creando soluciones innovadoras en Python y Power BI. Apasionado por la automatización y el análisis de datos.',
    'Español (Nativo), Inglés (B2)'
);