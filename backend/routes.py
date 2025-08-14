from flask import render_template, request, jsonify
from backend.emoticones import get_emoji_categories,get_emojis_by_category
from backend.config.database import Database

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
            
            emoji_data = get_emojis_by_category(category)
                
            return jsonify(emoji_data)
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500