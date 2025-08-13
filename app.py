from flask import Flask, render_template_string, jsonify
from backend.routes import configure_routes

app = Flask(__name__)

# Configurar las rutas
configure_routes(app)

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
    app.run(debug=True)