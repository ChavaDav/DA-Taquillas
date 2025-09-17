const express = require('express');
const path = require('path');
const app = express();
const port = 2000;
const mainRoutes = require('./routes/mainRoutes');
const { conectarMySQL } = require('./db/connection')

require('./db/connection');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('views'));

app.use('/', mainRoutes);

app.listen(port, () => {
  console.log('Servidor escuchando en http://localhost:'+ port);
});

app.post('/guardar', async (req, res) => {
  const { nombre, delega, DNI, ntaquilla, opciones } = req.body;

  try {
    const connection = await conectarMySQL();

    await connection.execute(
      'INSERT INTO users (nombre, delega , DNI, ntaquilla, opciones) VALUES (?, ?, ?, ?, ?)',
      [nombre, delega, DNI, ntaquilla, opciones]
    );

    await connection.end();

    res.send('✅ Datos insertados en la base de datos');
  } catch (error) {
    console.error('❌ Error al insertar en MySQL:', error.message);
    res.status(500).send('Error al insertar en la base de datos');
  }
});
