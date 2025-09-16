const express = require('express');
const path = require('path');
const app = express();
const port = 2000;
const mainRoutes = require('./routes/mainRoutes');

//require('./db/connection');

app.use(express.static('views'));

app.use('/', mainRoutes);

app.listen(port, () => {
  console.log('Servidor escuchando en http://localhost:'+ port);
});
