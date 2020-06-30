const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

// Crear proyectos
// api/proyectos
router.post('/',
    auth, // middleware que verifica el token en el header
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

// Obtener proyectos del usuario autenticado
router.get('/',
    auth, // middleware que verifica el token en el header
    proyectoController.obtenerProyectos
);

// Actualizar proyecto por ID
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

// Eliminar proyecto por ID
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;