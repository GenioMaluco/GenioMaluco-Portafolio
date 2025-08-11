import pyodbc
from dotenv import load_dotenv
import os

load_dotenv()  # Carga variables del archivo .env

class Database:
    @staticmethod
    def get_connection():
        """Retorna una conexión a SQL Server usando Windows Auth"""
        try:
            conn = pyodbc.connect(
                "DRIVER={ODBC Driver 17 for SQL Server};"
                f"SERVER={os.getenv('DB_SERVER')};"
                f"DATABASE={os.getenv('DB_NAME')};"
                "Trusted_Connection=yes;"
            )
            return conn
        except pyodbc.Error as e:
            print(f"Error de conexión: {e}")
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