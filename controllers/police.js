const { response } = require('express');
const bcryptjs = require('bcryptjs')

const { getUsers } = require('../services/user');
const { getPolicies } = require('../services/police');
const { paginate } = require('../helpers/util');

const get = async(req, res = response) => {

    const name = req.query.userName;

    try {
        // Paginacion logica de paginacion para no devolver todo el universo de datos
        let page = 1
        let pageSize = 10
        if (req.query.page != undefined) page = req.query.page;
        if (req.query.pageSize != undefined) pageSize = req.query.pageSize;

        // Llamada asincrona y en paralela para obtener usuarios y politicas
        const [users, policies] = await Promise.all([
            getUsers(),
            getPolicies()
        ]);

        // Buscar usuario por id dentro de la lista.
        const usersFiltered = users.filter(x => x.name.indexOf(name) > -1);

        // Buscamos cada police asociados a cada usuario previamente filtrado
        let policeFiltered = []
        policies.forEach(r => {
            const user = usersFiltered.find(x => x.id === r.clientId);
            if (user) {
                r.name = user.name
                policeFiltered.push(r)
            }
        })

        res.json({
            code: 0,
            result: paginate(policeFiltered, pageSize, page)
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