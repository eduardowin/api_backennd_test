const { response } = require('express')

const validateRole = (...roles) => {
    return (req, res = response, next) => {

        // Validar que la data de usuario exista para proceder a validar el rol que se requiere.
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        // Si el rol del usuario no está incluido en el listado de roles permitidos, entonces terminar flujo.
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            });
        }

        next();
    }
}



module.exports = {
    validateRole
}