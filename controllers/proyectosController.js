const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        pagina: 'Proyectos',
        proyectos
    })
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto', {
        pagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async (req, res) => {
    // Enviar a la consola lo que el usuario escriba
    // console.info(req.body)

    const proyectos = await Proyectos.findAll();

    // Validar que tengamos algo en el formulario
    const {nombre} = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agrega un nombre al Proyecto'})
    }

    // Si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto', {
            pagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay errores? Insertar en la DB.
        // const url = slug(nombre).toLowerCase();
        const proyecto = await Proyectos.create({nombre});
        res.redirect('/');
    }
}

exports.proyectoUrl = async (req, res, next) => {
    const proyectos = await Proyectos.findAll();

    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    if(!proyecto) return next();

    res.render('tareas', {
        pagina: 'Tareas del Proyecto',
        proyecto, 
        proyectos
    })

}