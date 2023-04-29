const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const constant = require('../config/constant');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('Authorization').split(" ")[1];

    if (!token) {
        return res.status(403).json({
            msg: constant.middlewares.validateJwt.msgJwtNotExists
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
            msg: constant.middlewares.validateJwt.msgCatchVerify
        })
    }

}

module.exports = {
    validateJWT
}