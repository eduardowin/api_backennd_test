const { query } = require('express-validator');

exports.querySchema = () => {
    return [
        query('name').exists().withMessage('El parametro name es obligatorio en el query')
    ]
}