const mysql = require('mysql2/promise');

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
    const [rows] = await connection.execute('SELECT * FROM users');
    console.log(rows);

    await connection.end();
  } catch (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
  }
}

conectarMySQL();
