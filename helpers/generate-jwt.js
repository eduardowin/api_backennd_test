const jwt = require('jsonwebtoken');
const constant = require('../config/constant');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.KEY_JWT, {
            expiresIn: '1h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject(constant.helpers.generateJwt.msgJwtNoGenerated)
            } else {
                resolve(token);
            }
        })

    })
}


module.exports = {
    generateJWT
}