const express = require('express');
const path = require('path');
const app = express();
const port = 2000;
const mainRoutes = require('./routes/mainRoutes');
const { conectarMySQL } = require('./db/connection')

require('./db/connection');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('views'));

app.use('/', mainRoutes);

app.listen(port, () => {
  console.log('Servidor escuchando en http://localhost:'+ port);
});

app.post('/existe', async (req, res) => {
  const { DNI, email } = req.body;

  try {
    const connection = await conectarMySQL();

    const [filas] = await connection.execute(
      'SELECT * FROM users WHERE DNI = ? OR email = ?',
      [DNI, email]
    );

    await connection.end();

    if (filas.length > 0) {
      res.json({ yaExiste: true });
    } else {
      res.json({ yaExiste: false });
    }

  } catch (error) {
    console.error('❌ Error al comprobar existencia en MySQL:', error.message);
    res.status(500).send('Error al comprobar los datos en la base de datos');
  }
});


app.post('/guardar', async (req, res) => {
  const { nombre, delega, DNI, telefono, email, ntaquilla } = req.body;

  try {
    const connection = await conectarMySQL();

    await connection.execute(
      'INSERT INTO users (nombre, delega , DNI, telefono, email, ntaquilla) VALUES (?, ?, ?, ?, ? ,?)',
      [nombre, delega, DNI, telefono, email, ntaquilla]
    );

    await connection.end();

    res.send('✅ Datos insertados en la base de datos');
  } catch (error) {
    console.error('❌ Error al insertar en MySQL:', error.message);
    res.status(500).send('Error al insertar en la base de datos');
  }
});
