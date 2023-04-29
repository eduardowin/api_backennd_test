const { check, query } = require('express-validator');

exports.getIdSchema = () => {
    return [
        check('id').exists().withMessage('El parametro id es obligatorio')
    ]
}

exports.querySchema = () => {
    return [
        query('name').exists().withMessage('El parametro name es obligatorio en el query')
    ]
}

exports.getBypoliceSchema = () => {
    return [
        check('policeId').exists().withMessage('El paramatro id de la politica es obligatorio')
    ]
}