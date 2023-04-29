const { Router } = require('express');

const { querySchema } = require('../schemaValidation/police');
const police = require('../controllers/police');
const { validateRole } = require('../middlewares/validate-role');
const { validateJWT } = require('../middlewares/validate-jwt');
const constant = require('../config/constant');
const router = Router();

router.get('/',
    validateJWT,
    validateRole(constant.role.admin),
    querySchema(),
    police.get);

module.exports = router;