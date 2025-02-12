require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

// Inicializar express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Rutas
app.use('/api', routes);

// Conexión a MongoDB - versión simplificada
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString)
    .then(() => console.log('Database Connected'))
    .catch(error => console.log('Database Error:', error));

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});