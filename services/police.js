const { response } = require('express');
const User = require('../models/user');
const axios = require('axios');
const constant = require('../config/constant');

const getPolicies = async() => {

    try {

        const instance = axios.create({
            baseURL: ` ${process.env.USER_URL_BASE}${constant.endpoint.police.policies}`
        })

        const resp = await instance.get();
        const user = resp.data;

        return user.policies;

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getPolicies
}