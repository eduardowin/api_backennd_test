const { query } = require('express-validator');
const constant = require('../config/constant');
const { validateFields } = require('../middlewares/validate-fields');

exports.querySchema = () => {
    return [
        query(constant.schemaValidation.police.query.field).exists().withMessage(constant.schemaValidation.police.query.msg),
        validateFields
    ]
}