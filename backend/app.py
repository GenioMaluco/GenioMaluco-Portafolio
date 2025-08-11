from flask import Flask, render_template, jsonify

app = Flask(__name__, 
           static_folder='src/static',
           template_folder='templates')

# Ruta principal ESSENCIAL
@app.route('/')
def home():
    return render_template('portafolio.html')  # Asegúrate de tener este archivo

# Endpoint para datos (sin imagen)
@app.route('/api/habilidades')
def get_habilidades():
    return jsonify({
        "blandas": [
            {"nombre": "Comunicación", "nivel": 90},
            {"nombre": "Liderazgo", "nivel": 85}
        ],
        "tecnicas": [
            {"nombre": "Python", "nivel": 95, "tipo": "lenguaje"},
            {"nombre": "Power BI", "nivel": 100, "tipo": "herramienta"}
        ]
    })

@app.route('/api/proyectos')
def get_proyectos():
    return jsonify([
        {"titulo": "Sistema de Reportes", "tecnologias": ["Python", "Power BI"]}
    ])

# Vista principal
@app.route('/')
def portafolio():
    return render_template('portafolio.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)