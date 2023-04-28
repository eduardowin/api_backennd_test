const constant = require('../config/constant');

const User = {

    id: {
        type: String
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: constant.role.user,
        emun: [constant.role.admin, constant.role.user]
    }
};

module.exports = User;