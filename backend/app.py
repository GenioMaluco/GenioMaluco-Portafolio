from flask import Flask, jsonify
from config.database import Database  # Asumiendo que tienes este módulo

app = Flask(__name__)

@app.route('/')
def home():
    return """
    <h1>Bienvenido a mi Portafolio</h1>
    <p>Endpoints disponibles:</p>
    <ul>
        <li><a href="/api/habilidades">/api/habilidades</a></li>
        <li><a href="/api/persona">/api/persona</a></li>
        <li><a href="/api/proyectos">/api/proyectos</a></li>
    </ul>
    """

@app.route('/api/habilidades')
def get_habilidades():
    habilidades = Database.execute_query("SELECT tipo, nombre, nivel FROM Habilidades")
    return jsonify(habilidades if habilidades else {"error": "No se pudo conectar a la BD"})

@app.route('/api/persona')
def get_persona():
    persona = Database.execute_query("SELECT nombre_completo, titulo_profesional FROM Persona")
    return jsonify(persona[0] if persona else {"error": "Datos no encontrados"})

@app.route('/api/proyectos')
def get_proyecto():
    proyecto = Database.execute_query("SELECT titulo, descripcion FROM Proyectos")
    return jsonify(proyecto[0] if proyecto else {"error": "Datos no encontrados"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)