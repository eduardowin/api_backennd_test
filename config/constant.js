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
                msg: 'El parametro userName es obligatorio en el query'
            }
        },
        user: {
            id: {
                field: 'id',
                msg: 'El parametro id es obligatorio'
            },
            query: {
                field: 'name',
                msg: 'El parametro name es obligatorio en el query'
            },
            policeId: {
                field: 'policeId',
                msg: 'El paramatro id de la politica es obligatorio'
            }
        },
        auth: {
            query: {
                email: {
                    field: 'email',
                    msg: 'El correo es obligatorio'
                },
                password: {
                    field: 'password',
                    msg: 'La contraseña es obligatoria'
                },
            }
        }
    },
    middlewares: {
        validateRole: {
            msgUserNotExists: 'Se quiere verificar el role sin validar el token primero',
            msgRoleMandatory: 'El servicio requiere uno de estos roles:'
        },
        validateJwt: {
            msgJwtNotExists: 'No hay token en la petición',
            msgCatchVerify: 'Token no válido'
        }
    },
    helpers: {
        generateJwt: {
            msgJwtNoGenerated: 'No se pudo generar el token'
        }
    },
    controller: {
        user: {
            msgCatchGet: 'Hable con el administrador',
            msgUserNotExists: 'Usuario no existe',
            msgPoliceNotExists: 'La politica no existe'
        },
        auth: {
            msgUserOrPassNotRight: 'Usuario / Password no son correctos - password'
        }
    }

});