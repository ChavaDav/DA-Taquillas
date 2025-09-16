const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/mi_base_de_datos';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));
