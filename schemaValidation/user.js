const { check, query, param } = require('express-validator');
const constant = require('../config/constant');
const { validateFields } = require('../middlewares/validate-fields');

exports.getIdSchema = () => {
    return [
        param(constant.schemaValidation.user.id.field, constant.schemaValidation.user.id.msg).exists().isLength({ min: 2 }),
        validateFields
    ]
}

exports.querySchema = () => {
    return [
        query(constant.schemaValidation.user.query.field).exists().withMessage(constant.schemaValidation.user.query.msg),
        validateFields
    ]
}

exports.getBypoliceSchema = () => {
    return [
        param(constant.schemaValidation.user.policeId.field, constant.schemaValidation.user.policeId.msg).exists().isLength({ min: 2 }),
        validateFields
    ]
}