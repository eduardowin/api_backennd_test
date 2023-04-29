const { response } = require('express');
const bcryptjs = require('bcryptjs')

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
                msg: 'Usuario / Password no son correctos - correo'
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
                msg: 'Usuario / Password no son correctos - password'
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
            msg: 'Hable con el administrador'
        });
    }

}


const googleSignin = async(req, res = response) => {

    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }



}


const renovarToken = async(req, res = response) => {

    const { usuario } = req;

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    })
}


module.exports = {
    login,
    googleSignin,
    renovarToken
}