const { response } = require('express');
const User = require('../models/user');
const axios = require('axios');
const constant = require('../config/constant');

const getUsers = async() => {

    try {

        const instance = axios.create({
            baseURL: ` ${process.env.USER_URL_BASE}${constant.endpoint.user.users}`
        })

        const resp = await instance.get();
        const user = resp.data;

        return user.clients;

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getUsers
}