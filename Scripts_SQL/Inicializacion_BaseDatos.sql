USE Personal
CREATE TABLE Habilidades (
    id INT PRIMARY KEY IDENTITY,
    tipo VARCHAR(20) CHECK (tipo IN ('blanda', 'tecnica', 'herramienta', 'lenguaje')),
    nombre VARCHAR(50) NOT NULL,
    nivel TINYINT,
    categoria VARCHAR(30) NULL,
    icono VARCHAR(100) NULL
);

CREATE TABLE Proyectos (
    id INT PRIMARY KEY IDENTITY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    url VARCHAR(255),
    tags VARCHAR(255)
);