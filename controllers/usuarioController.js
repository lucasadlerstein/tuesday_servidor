const Usuario = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()})
    }
    
    // extraer email
    const {email, password} = req.body;
    
    try {
        // revisar que el usuario sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        // crear el nuevo usuario
        usuario = new Usuario(req.body);

        // hash pass
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // guardar usuario creado
        await usuario.save();

        // Crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        // firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // una hora
        }, (error, token) => {
            if(error) throw error;
            // mensaje de confirmacion
            res.json({token: token});
        });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}