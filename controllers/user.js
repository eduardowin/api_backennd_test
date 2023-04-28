const { response } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');
const { getUsers } = require('../services/user');
const { getPolicies } = require('../services/police');

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
                msg: 'Usuario no existe'
            });
        }

        res.json(
            user
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const users = async(req, res = response) => {

    const name = req.query.name;
    try {
        // Agregar Paginado para no mostrar todoso los datos
        // Agregar Paginado para no mostrar todoso los datos
        // Agregar Paginado para no mostrar todoso los datos
        // Agregar Paginado para no mostrar todoso los datos
        // Agregar Paginado para no mostrar todoso los datos

        // Llamada asincrona y en paralela para obtener usuarios del endpoint
        const [users] = await Promise.all([
            getUsers()
        ]);

        // buscar usuario por id dentro de la lista.
        const usersFiltered = users.filter(x => x.name.indexOf(name) > -1);
        if (usersFiltered && usersFiltered.lenght == 0) {
            return res.status(200).json({
                code: 1,
                msg: 'No se encontraron coincidencias en la busqueda'
            });
        }

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
                msg: 'La politica no existe'
            });
        }

        // buscar usuarioo por id
        const user = users.find(x => x.id === police.clientId);
        if (!user) {
            return res.status(404).json({
                msg: 'El usuario no existe'
            });
        }

        res.json({
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    get,
    users,
    getByPoliceId
}