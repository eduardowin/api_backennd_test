const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateRole } = require('../middlewares/validate-role');
const { getIdSchema, querySchema, getBypoliceSchema } = require('../schemaValidation/user');

const constant = require('../config/constant');
const user = require('../controllers/user');
const router = Router();



/**
 * Get user
 * @openapi
 * /users/{id}:
 *    get:
 *      tags:
 *        - user
 *      summary: "Gets user by Id"
 *      description: Returns an object of class user by Id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id User parameter in path
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns an object of class user
 *        '400':
 *          description: The Id parameter not been provided
 *        '403':
 *          description: Not authorized or Invalid token
 *    responses:
 *      '200':
 *        description: Returns an object of class user
 *      '403':
 *        description: Not authorized or Invalid token
 */
router.get('/:id',
    validateJWT,
    validateRole(constant.role.admin, constant.role.user),
    getIdSchema(),
    user.get);

/**
 * Get users
 * @openapi
 * /users:
 *    get:
 *      tags:
 *        - user
 *      summary: "Gets users by Name"
 *      description: Returns a list of User class objects
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: name
 *        in: query
 *        description: Name parameter in query
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *          '200':
 *            description: Successful operation, Returns a object result with array of user object
 *            content:
 *              application/json:
 *                schema:
 *                    $ref: '#/components/schemas/resultList'   
 *          '400':
 *            description: The Name parameter not been provided
 *          '403':
 *            description: Not authorized or Invalid token
 *    responses:
 *      '200':
 *        description: Successful operation, Returns a object result with array of user object
 *      '403':
 *        description: Not authorized or Invalid token
 */
router.get('/',
    validateJWT,
    validateRole(constant.role.admin, constant.role.user),
    querySchema(),
    user.users);


/**
 * Get user by Policy Id
 * @openapi
 * /users/bypolice/{policeId}:
 *    get:
 *      tags:
 *        - user
 *      summary: "Gets user by Policy Id"
 *      description: Returns an object of class user by Policy Id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: policeId
 *        in: path
 *        description: Policy Id in path
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Returns an object of class user
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/user'
 *        '400':
 *          description: The PolicyId parameter not been provided
 *        '403':
 *          description: Not authorized or Invalid token
 *    responses:
 *      '200':
 *        description: Returns an object of class user
 *      '403':
 *        description: Not authorized or Invalid token
 */

router.get('/bypolice/:policeId',
    validateJWT,
    validateRole(constant.role.admin),
    getBypoliceSchema(),
    user.getByPoliceId);


module.exports = router;