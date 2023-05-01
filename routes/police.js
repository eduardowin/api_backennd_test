const { Router } = require('express');

const { querySchema } = require('../schemaValidation/police');
const police = require('../controllers/police');
const { validateRole } = require('../middlewares/validate-role');
const { validateJWT } = require('../middlewares/validate-jwt');
const constant = require('../config/constant');
const router = Router();



/**
 * Get users
 * @openapi
 * /policies:
 *    get:
 *      tags:
 *        - Policy
 *      summary: "Gets policies by Name of user"
 *      description: Returns a list of policies object objects, in a array atribute of a object result
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: userName
 *        in: query
 *        description: userName parameter in query
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *          '200':
 *            description: Returns a list of policies object objects, in a array atribute of a object result
 *            content:
 *              application/json:
 *                schema:
 *                    $ref: '#/components/schemas/resultListPolicies'   
 *          '400':
 *            description: The Name parameter not been provided
 *          '403':
 *            description: Not authorized or Invalid token
 *    responses:
 *      '200':
 *        description: Returns a list of policies object objects, in a array atribute of a object result
 *      '403':
 *        description: Not authorized or Invalid token
 */
router.get('/',
    validateJWT,
    validateRole(constant.role.admin),
    querySchema(),
    police.get);

module.exports = router;