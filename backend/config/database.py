import pyodbc
from dotenv import load_dotenv
import os
import unicodedata

load_dotenv()  # Carga variables del archivo .env

class Database:

    def print_emoji_table():
                """Función para imprimir una tabla de emojis organizada por categorías"""
                # Diccionario de categorías de emojis con sus rangos y descripciones
                emoji_categories = {
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
                    },
                    "Actividades": {
                        "range": (0x1F383, 0x1F3CA),
                        "description": "Deportes, juegos, eventos, entretenimiento"
                    },
                    "Viajes y Lugares": {
                        "range": (0x1F30D, 0x1F3D9),
                        "description": "Lugares geográficos, edificios, puntos de referencia"
                    }
                }
                
                for category, data in emoji_categories.items():
                    start, end = data["range"]
                    print(f"\n{'=' * 40}")
                    print(f"{category.upper():^40}")
                    print(f"{data['description']:^40}")
                    print(f"{'=' * 40}")
                    print("| {:<8} | {:<50} | {:<10} |".format("Código", "Nombre", "Emoji"))
                    print("-" * 80)
                    
                    for codepoint in range(start, end + 1):
                        try:
                            emoji = chr(codepoint)
                            name = unicodedata.name(emoji, "Desconocido")
                            print(f"| U+{codepoint:04X} | {name:<50} | {emoji:<10} |")
                        except ValueError:
                            continue

    # Llamada a la función
    print_emoji_table()

    @staticmethod
    def get_connection():
        server = os.getenv('DB_SERVER')
        db_name = os.getenv('DB_NAME')
        db_encrypt = os.getenv('DB_TRUSTED_CONNECTION')
        """Retorna una conexión a SQL Server usando Windows Auth"""
        try:
            conn = pyodbc.connect(
                "DRIVER={ODBC Driver 17 for SQL Server};"
                f"SERVER={server};"
                f"DATABASE={db_name};"
                #f"Trusted_Connection={db_encrypt};"
            )
            return conn
        except pyodbc.Error as e:
            print(f"Error de conexión: \U0001F600 {e}")

            return None

    @staticmethod
    def execute_query(query, params=None):
        """Ejecuta una consulta y retorna los resultados"""
        conn = Database.get_connection()
        if not conn:
            return None
        
        try:
            cursor = conn.cursor()
            cursor.execute(query, params or ())
            
            # Para SELECT retorna resultados, para INSERT/UPDATE retorna rowcount
            if query.strip().upper().startswith("SELECT"):
                columns = [column[0] for column in cursor.description]
                return [dict(zip(columns, row)) for row in cursor.fetchall()]
            else:
                conn.commit()
                return cursor.rowcount
        finally:
            conn.close()