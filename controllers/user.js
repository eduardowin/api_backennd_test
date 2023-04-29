const { response } = require('express');
const constant = require('../config/constant');
const { getUsers } = require('../services/user');
const { getPolicies } = require('../services/police');
const { paginate } = require('../helpers/util');

const get = async(req, res = response) => {

    const userId = req.params.id;

    try {

        // Llamada asincrona y en paralela para obtener usuarios del endpoint
        const [users] = await Promise.all([
            getUsers()
        ]);

        // buscar usuario por id dentro de la lista.
        const user = users.find(x => x.id === userId);
        if (!user) {
            return res.status(404).json({
                code: 1,
                msg: constant.controller.user.msgUserNotExists
            });
        }

        res.json(
            user
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 1,
            msg: constant.controller.user.msgCatchGet
        });
    }

}

const users = async(req, res = response) => {

    const name = req.query.name;
    try {

        // Paginacion logica de paginacion para no devolver todo el universo de datos
        let page = 1
        let pageSize = 10
        if (req.query.page != undefined) page = req.query.page;
        if (req.query.pageSize != undefined) pageSize = req.query.pageSize;

        // Llamada asincrona y en paralela para obtener usuarios del endpoint
        const [users] = await Promise.all([
            getUsers()
        ]);

        // buscar usuario por id dentro de la lista.
        const usersFiltered = users.filter(x => x.name.indexOf(name) > -1);

        res.json({
            code: 0,
            result: paginate(usersFiltered, pageSize, page)
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 1,
            msg: constant.controller.user.msgCatchGet
        });
    }
}

const getByPoliceId = async(req, res = response) => {

    const policeId = req.params.policeId;

    try {

        // Llamada asincrona y en paralela para obtener usuarios del endpoint
        const [users, policies] = await Promise.all([
            getUsers(),
            getPolicies()
        ]);

        // buscar police por id
        const police = policies.find(x => x.id === policeId);
        if (!police) {
            return res.status(404).json({
                msg: constant.controller.user.msgPoliceNotExists
            });
        }

        // buscar usuario por id
        const user = users.find(x => x.id === police.clientId);
        if (!user) {
            return res.status(404).json({
                msg: constant.controller.user.msgUserNotExists
            });
        }

        res.json(
            user
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 1,
            msg: constant.controller.user.msgCatchGet
        });
    }

}

module.exports = {
    get,
    users,
    getByPoliceId
}