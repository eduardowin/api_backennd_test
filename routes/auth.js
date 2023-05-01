const { Router } = require('express');
const { login } = require('../controllers/auth');
const { postSchema } = require('../schemaValidation/auth');

const router = Router();

/**
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - Auth
 *      summary: "Login user"
 *      description: Login to a new user and get the session token
 *      responses:
 *        '200':
 *          description: Returns an object with information about the user and the token
 *        '400':
 *          description: Email and user data have not been provided
 *        '401':
 *          description: Invalid authentication credentials
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/auth"
 *    responses:
 *      '200':
 *        description: Returns the object inserted in the collection with status '200'
 *      '401':
 *        description: Invalid authentication credentials
 */
router.post('/login', postSchema(), login);



module.exports = router;