from flask import render_template, request, jsonify
from backend.emoticones import get_emoji_categories, get_emojis_by_category

def configure_routes(app):
    @app.route('/')
    def index():
        return render_template('index.html')
    
    @app.route('/emojis')
    def emojis():
        categories = list(get_emoji_categories().keys())  # Convertimos a lista
        return render_template('emojis.html', categories=categories)
    
    @app.route('/get_emojis', methods=['POST'])
    def get_emojis():
        try:
            category = request.form.get('category')
            if not category:
                return jsonify({"error": "No se proporcionó categoría"}), 400
            
            emoji_data = get_emojis_by_category(category)
            if not emoji_data:
                return jsonify({"error": "Categoría no encontrada"}), 404
                
            return jsonify(emoji_data)
        except Exception as e:
            return jsonify({"error": str(e)}), 500