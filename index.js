const express = require('express');
const conectarDB = require('./config/db.js');
const cors = require('cors');

// crear el servidor
const app = express();

// conectar a la bdd
conectarDB();

// Habiliar CORS para tener front y back en diferentes urls
app.use(cors());

// habilitar express.json
app.use(express.json({ extend: true }));

// Puerto de la APP: no poner como puerto el 3000
const port = process.env.port || 4000;

// Definir pagina principal
// app.get('/', (req, res) => {
//     res.send('hola mundo');
// })

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

app.listen(port, '0.0.0.0', () => {
    console.log(`servidor corriendo en el puerto ${port}`);
});