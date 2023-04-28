const { Router } = require('express');
const { query } = require('express-validator');

const { validateFields } = require('../middlewares/validar-campos');

const police = require('../controllers/police');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get('/',
    validarJWT, [
        query('name').exists().withMessage('El parametro name es obligatorio en el query')
    ], police.get);


module.exports = router;