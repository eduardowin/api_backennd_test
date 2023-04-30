const constant = require('../config/constant');

const Policy = {

    id: {
        type: String
    },
    amountInsured: {
        type: Number,
    },
    email: {
        type: String,
        unique: true
    },
    inceptionDate: {
        type: String
    },
    installmentPayment: {
        type: Boolean
    },
    clientId: {
        type: String
    }
};

module.exports = Policy;