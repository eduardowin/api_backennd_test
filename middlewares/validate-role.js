const { response } = require('express')
const constant = require('../config/constant');

const validateRole = (...roles) => {
    return (req, res = response, next) => {

        // Validar que la data de usuario exista para proceder a validar el rol que se requiere.
        if (!req.user) {
            return res.status(500).json({
                msg: constant.middlewares.validateRole.msgUserNotExists
            });
        }

        // Si el rol del usuario no está incluido en el listado de roles permitidos, entonces terminar flujo.
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `${constant.middlewares.validateRole.msgRoleMandatory}${ roles }`
            });
        }

        next();
    }
}



module.exports = {
    validateRole
}