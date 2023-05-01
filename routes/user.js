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
 * /user/:
 *    post:
 *      tags:
 *        - user
 *      summary: "Gets user by Id"
 *      description: Returns an object of class user by Id
 *      responses:
 *        '200':
 *          description: Returns an object of class user
 *        '400':
 *          description: The Id parameter not been provided
 *        '403':
 *          description: not authorized
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/user"
 *    responses:
 *      '200':
 *        description: Returns an object of class user
 *      '403':
 *        description: not authorized
 */
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