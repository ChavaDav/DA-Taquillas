const express = require('express');
const path = require('path');
const app = express();

app.set("view engine","html");

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(2000, () => {
  console.log('Servidor escuchando en http://localhost:2000');
});
