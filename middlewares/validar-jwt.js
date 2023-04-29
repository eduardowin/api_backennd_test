const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('Authorization').split(" ")[1];

    if (!token) {
        return res.status(403).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        // Verificar token y obtener data de usuario
        const { uid } = jwt.verify(token, process.env.KEY_JWT);
        req.user = uid;

        next();

    } catch (error) {

        console.log(error);
        res.status(403).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validateJWT
}