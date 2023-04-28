const { response } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');

const { getUsers } = require('../services/user');
const { getPolicies } = require('../services/police');

const get = async(req, res = response) => {

    const name = req.query.userName;

    try {
        // Agregar Paginado para no mostrar todoso los datos

        // Llamada asincrona y en paralela para obtener usuarios y politicas
        const [users, policies] = await Promise.all([
            getUsers(),
            getPolicies()
        ]);

        console.log(policies)

        // buscar usuario por id dentro de la lista.
        const usersFiltered = users.filter(x => x.name.indexOf(name) > -1);
        if (usersFiltered && usersFiltered.lenght == 0) {
            return res.status(200).json({
                code: 1,
                msg: 'No se encontraron coincidencias en la busqueda'
            });
        }

        usersFiltered.forEach(user => {
            const policiesByUser = policies.filter(x => x.clientId == user.id);
            console.log(policiesByUser);
            user.policies = policiesByUser;
        });
        console.log(usersFiltered)
        res.json({
            code: 0,
            result: usersFiltered
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    get
}