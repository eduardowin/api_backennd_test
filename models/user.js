const constant = require('../config/constant');

const User = {

    id: {
        type: String
    },
    name: {
        type: String,
    },
    email: {
        type: String,
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