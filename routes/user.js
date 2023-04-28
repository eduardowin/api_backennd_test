const { Router } = require('express');
const { check, query } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const user = require('../controllers/user');

const router = Router();

router.get('/:id',
    validarJWT, [
        check('id').exists().withMessage('El parametro id es obligatorio')
    ], user.get);

router.get('/',
    validarJWT, [
        query('name').exists().withMessage('El parametro name es obligatorio en el query')
    ], user.users);

router.get('/bypolice/:policeId',
    validarJWT, [
        check('policeId').exists().withMessage('El paramatro id de la politica es obligatorio')
    ], user.getByPoliceId);

// router.get('/', validarJWT, renovarToken );

module.exports = router;