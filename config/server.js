const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const swaggerUI = require("swagger-ui-express")
const openApiConfigration = require("../docs/swagger")

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = createServer(this.app);
        this.app.use('/documentation',
            swaggerUI.serve,
            swaggerUI.setup(openApiConfigration))

        // Asignar path de endpoint por entidad o controller
        this.paths = {
            auth: '/api/auth',
            user: '/api/users',
            police: '/api/policies',
        }

        // Conectar a base de datos en caso hubiera

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();


    }

    middlewares() {

        // Configurar CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.police, require('../routes/police'));

    }


    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;