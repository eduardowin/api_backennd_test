module.exports = Object.freeze({
    roleDefault: 'user',
    role: {
        admin: 'admin',
        user: 'user'
    },
    endpoint: {
        user: {
            users: '/v2/5808862710000087232b75ac'
        },
        police: {
            policies: '/v2/580891a4100000e8242b75c5'
        }
    },
    schemaValidation: {
        police: {
            query: {
                field: 'userName',
                msg: 'The parameter userName is mandatory in the query'
            }
        },
        user: {
            id: {
                field: 'id',
                msg: 'The id parameter is mandatory'
            },
            query: {
                field: 'name',
                msg: 'The name parameter is mandatory in the query'
            },
            policeId: {
                field: 'policeId',
                msg: 'The id parameter of the policy is mandatory.'
            }
        },
        auth: {
            query: {
                email: {
                    field: 'email',
                    msg: 'Email is mandatory'
                },
                password: {
                    field: 'password',
                    msg: 'Password is mandatory'
                },
            }
        }
    },
    middlewares: {
        validateRole: {
            msgUserNotExists: 'You want to verify the role without validating the token first',
            msgRoleMandatory: 'The service requires one of these roles:'
        },
        validateJwt: {
            msgJwtNotExists: 'No token in the request',
            msgCatchVerify: 'Invalid token'
        }
    },
    helpers: {
        generateJwt: {
            msgJwtNoGenerated: 'Could not generate token'
        }
    },
    controller: {
        user: {
            msgCatchGet: 'Talk to the administrator',
            msgUserNotExists: 'User does not exist',
            msgPoliceNotExists: 'Policy does not exist'
        },
        auth: {
            msgUserOrPassNotRight: 'User / Password are not correct - password'
        }
    }

});