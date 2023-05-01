const constant = require('../config/constant');

class Policy {

    constructor(id, amountInsured, email, inceptionDate, installmentPayment, clientId) {
        this.id = id;
        this.amountInsured = amountInsured;
        this.email = email;
        this.inceptionDate = inceptionDate;
        this.installmentPayment = installmentPayment;
        this.clientId = clientId;
    }

};

module.exports = Policy;