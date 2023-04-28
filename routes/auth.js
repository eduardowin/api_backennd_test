const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth');


const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);


// router.get('/', validarJWT, renovarToken );


module.exports = router;