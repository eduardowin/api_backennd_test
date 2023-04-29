const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateRole } = require('../middlewares/validate-role');
const { getIdSchema, querySchema, getBypoliceSchema } = require('../schemaValidation/user');

const constant = require('../config/constant');
const user = require('../controllers/user');
const router = Router();

router.get('/:id',
    validateJWT,
    validateRole(constant.role.admin, constant.role.user),
    getIdSchema(),
    user.get);

router.get('/',
    validateJWT,
    validateRole(constant.role.admin, constant.role.user),
    querySchema(),
    user.users);

router.get('/bypolice/:policeId',
    validateJWT,
    validateRole(constant.role.admin),
    getBypoliceSchema(),
    user.getByPoliceId);


module.exports = router;