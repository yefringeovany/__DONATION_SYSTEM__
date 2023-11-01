const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuarios = require('../model/usuariosModel');

router.post("/", async (req, res) => {
    const dataUsuarios = req.body;
    const encryptedPass = bcrypt.hashSync(dataUsuarios.PasswordHash, 10);

    try {
        const createUsuarios = await Usuarios.create({
            Nombre: dataUsuarios.Nombre,
            Apellido: dataUsuarios.Apellido,
            Email: dataUsuarios.Email,
            PasswordHash: encryptedPass,
            Rol: dataUsuarios.Rol, 
            Activo: dataUsuarios.Activo
        });
        res.status(201).json(createUsuarios);
    } catch (err) {
        res.status(500).json();
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const usuario = await Usuarios.findByPk(id);

    if (usuario) {
        res.status(200).json(usuario);
    } else {
        res.status(404).json();
    }
});

module.exports = router;
