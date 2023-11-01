const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Usuarios = require('../model/usuariosModel');

router.post("/login", async (req, res) => {
    const { Email, PasswordHash } = req.body;

    const usuario = await Usuarios.findOne({ 
        where: { Email: Email } 
    });

    if (!usuario) {
        return res.status(401).json({ 
            message: "Correo o contraseña incorrecta" 
        });
    }

    const isPasswordValid = await bcrypt.compare(PasswordHash, usuario.PasswordHash);

    if (isPasswordValid) {
        // Guarda solo el UsuarioID en la sesión
        req.session.UsuarioID = usuario.UsuarioID;

        res.status(200).json({ 
            UsuarioID: req.session.UsuarioID  // Devuelve el UsuarioID en la respuesta
        });
    } else {
        res.status(401).json({ 
            message: "Correo o contraseña incorrecta" 
        });
    }
});

router.get("/logout", async (req, res, next) => {
    req.session.UsuarioID = null;
    res.send(200);
})

module.exports = router;
