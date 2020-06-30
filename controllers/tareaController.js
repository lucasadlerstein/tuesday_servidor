const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

// Crear tarea
exports.crearTarea = async (req, res) => {
    // revisar errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    // extraer proyecto y comprobar si existe
    try {
        const {proyecto} = req.body; 

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Ver que el usuario sea el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Crear la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener tareas
exports.obtenerTareas = async (req, res) => {

    // extraer proyecto y comprobar si existe
    try {
        const {proyecto} = req.query;
        // .query por que la consulta se mando como PARAMS 

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Ver que el usuario sea el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }    

        // obtener tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({creado:-1});

        res.json({tareas});


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Actualizar tarea
exports.actualizarTarea = async (req, res) => {
    try {
        const {proyecto, nombre, estado} = req.body; 

        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'No existe la tarea'});
        }

        // Ver que el usuario sea el creador del proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }    

        // Crear objeto con la info
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;
        
        // guardar tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, { new: true });

        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');

    }
}

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
    try {
        const {proyecto} = req.query; 

        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'No existe la tarea'});
        }

        // Ver que el usuario sea el creador del proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }    

        // Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}