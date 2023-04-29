const { check } = require('express-validator');
const constant = require('../config/constant');
const { validateFields } = require('../middlewares/validate-fields');

exports.postSchema = () => {
    return [
        check(constant.schemaValidation.auth.query.email.field, constant.schemaValidation.auth.query.email.msg).isEmail(),
        check(constant.schemaValidation.auth.query.password.field, constant.schemaValidation.auth.query.password.msg).not().isEmpty(),
        validateFields
    ]
}