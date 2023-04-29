const { Router } = require('express');
const { login } = require('../controllers/auth');
const { postSchema } = require('../schemaValidation/auth');

const router = Router();

router.post('/login', postSchema(), login);

module.exports = router;