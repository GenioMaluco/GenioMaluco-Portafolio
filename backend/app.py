from flask import Flask, jsonify
import pyodbc

app = Flask(__name__)

# Configuración SQL Server
server = 'TU_SERVIDOR'
database = 'TU_DB'
username = 'USUARIO'
password = 'CONTRASEÑA'
conn_str = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}'

@app.route('/api/habilidades')
def get_habilidades():
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Habilidades")
    rows = cursor.fetchall()
    return jsonify([dict(zip([column[0] for column in cursor.description], row)) for row in rows])

if __name__ == '__main__':
    app.run(debug=True)