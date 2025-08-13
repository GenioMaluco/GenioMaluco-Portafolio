import unicodedata

def get_emoji_categories():
    """Devuelve las categorías de emojis disponibles"""
    return {
        "Emoticones": {
            "range": (0x1F600, 0x1F64F),
            "description": "Caras sonrientes, expresiones faciales humanas"
        },
        "Símbolos y Pictogramas": {
            "range": (0x1F300, 0x1F5FF),
            "description": "Objetos, símbolos, conceptos abstractos"
        },
        "Transporte y Símbolos": {
            "range": (0x1F680, 0x1F6FF),
            "description": "Vehículos, señales, mapas, tecnología"
        },
        "Suplemento de Emojis": {
            "range": (0x1F900, 0x1F9FF),
            "description": "Emojis adicionales como personas fantásticas, deportes"
        },
        "Animales y Naturaleza": {
            "range": (0x1F400, 0x1F4F3),
            "description": "Animales, plantas, fenómenos naturales"
        },
        "Comida y Bebida": {
            "range": (0x1F32D, 0x1F37F),
            "description": "Alimentos, platos, bebidas"
        }
    }

def get_emojis_by_category(category_name):
    """Devuelve los emojis de una categoría específica"""
    categories = get_emoji_categories()
    
    if category_name not in categories:
        return None
    
    start, end = categories[category_name]["range"]
    emojis = []
    
    for codepoint in range(start, end + 1):
        try:
            emoji = chr(codepoint)
            name = unicodedata.name(emoji, "Desconocido")
            emojis.append({
                "code": f"U+{codepoint:04X}",
                "name": name,
                "emoji": emoji
            })
        except ValueError:
            continue
    
    return {
        "name": category_name,
        "description": categories[category_name]["description"],
        "emojis": emojis
    }