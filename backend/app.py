from flask import Flask, jsonify, abort
import pyodbc
from functools import wraps

app = Flask(__name__)


def get_db_connection():
    try:
        conn = pyodbc.connect(
            "DRIVER={ODBC Driver 17 for SQL Server};"
            "SERVER=GENIOMALUCO\SAGITARIO;"
            "DATABASE=PERSONAL;"
            "Trusted_Connection=yes;"
        )
        return conn
    except pyodbc.Error as e:
        print(f"Error de conexión: {e}")
        return None

# Configuración SQL Server
server = 'GENIOMALUCO\SAGITARIO'
database = 'PERSONAL'
conn_str = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;'

@app.route('/api/habilidades')
def get_habilidades():
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Habilidades")
    rows = cursor.fetchall()
    return jsonify([dict(zip([column[0] for column in cursor.description], row)) for row in rows])

if __name__ == '__main__':
    app.run(debug=True)