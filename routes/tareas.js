const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crear tarea
// api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);


// Listar tareas por proyecto
// api/tareas
router.get('/',
    auth,
    tareaController.obtenerTareas
);

// Actualizar tarea
// api/tareas
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);

// Eliminar tarea
// api/tareas
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router;
