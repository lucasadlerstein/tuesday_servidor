// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

// Crear usuario
// api/usuarios
router.post('/',
    [
        check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
        check('email').isEmail().withMessage('El email no es valido'),
        check('password').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres')
    ],
    usuarioController.crearUsuario
);

module.exports = router;