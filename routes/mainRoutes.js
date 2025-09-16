const express = require('express');
const path = require('path');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// Puedes agregar más rutas aquí
router.get('/about', (req, res) => {
  res.send('<h2>Esta es la página "Acerca de"</h2>');
});

module.exports = router;
