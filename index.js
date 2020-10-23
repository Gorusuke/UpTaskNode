const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// Helper con algunas funciones
const helper = require('./helpers');

// Crear la conexion a la base de datos
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');

db.sync()
    .then(() => console.info('Conectado al servidor'))
    .catch((error) => console.info(error))

// db.authenticate()
//     .then(() => console.info('Conectado al servidor'))
//     .catch((error) => console.info(error))

// Crear la app de express
const app = express();

// Donbde buscar los archivos estaticoss
app.use(express.static('public'));


// Habilitar pug
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Pasar var dum a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helper.vardump;
    next();
});

// Habilitar bodyParser para leer los datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// Ruta para el home
app.use('/', routes());

app.listen(3000);