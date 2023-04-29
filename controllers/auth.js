const { response } = require('express');
const bcryptjs = require('bcryptjs')
const constant = require('../config/constant');
const { generateJWT } = require('../helpers/generate-jwt');
const { getUsers } = require('../services/user');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Llamada asincrona y en paralela para obtener todos los datoa a evaluar y devolver
        const [users] = await Promise.all([
            getUsers()
        ]);

        // Verificar si el email existe
        const user = users.find(x => x.email === email);
        if (!user) {
            return res.status(401).json({
                code: 1,
                msg: constant.controller.auth.msgUserOrPassNotRight
            });
        }

        // Podriamos validar si el usuario se encuentra activo?

        // Creamos un password con hash que podria haber estado en la db del email, para compararlo con el password.
        const salt = bcryptjs.genSaltSync();
        const passwordHash = bcryptjs.hashSync(email, salt);

        // Podriamos verificar la contraseña, pero en este caso asumiremos que la contraseña es igual al email.
        const validPassword = bcryptjs.compareSync(password, passwordHash);
        if (!validPassword) {
            return res.status(401).json({
                code: 1,
                msg: constant.controller.auth.msgUserOrPassNotRight
            });
        }

        // Generar el JWT
        const token = await generateJWT({
            id: user.id,
            role: user.role
        });

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 1,
            msg: constant.controller.user.msgCatchGet
        });
    }

}

module.exports = {
    login
}