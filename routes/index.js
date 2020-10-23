const express = require('express');
const router = express.Router();

// importar express-validator
const { body } = require('express-validator')

// Importar controladores
const proyectosController = require('../controllers/proyectosController');


module.exports = function() {

    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );
    // Listar proyecto
    router.get('/proyectos/:url', proyectosController.proyectoUrl)
    
    return router;
}