const { Router } = require('express');
const { query } = require('express-validator');

const { querySchema } = require('../schemaValidation/police');
const police = require('../controllers/police');
const { validateRole } = require('../middlewares/validar-roles');
const { validateJWT } = require('../middlewares/validar-jwt');
const constant = require('../config/constant');
const router = Router();

router.get('/',
    validateJWT,
    validateRole(constant.role.admin),
    querySchema(),
    police.get);

module.exports = router;