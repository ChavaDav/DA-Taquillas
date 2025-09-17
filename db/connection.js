const mysql = require('mysql2/promise');
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware para recibir JSON
app.use(express.json());

// Conexión a la base de datos
async function conectarMySQL() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'taquillas'
    });

    console.log('✅ Conectado a MySQL');
    return connection;
  } catch (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    throw err;
  }
}

module.exports = {
conectarMySQL
}
