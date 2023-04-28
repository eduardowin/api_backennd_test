const express = require('express');
const cors = require('cors');
// const fileUpload = require('express-fileupload');
const { createServer } = require('http');

// const { dbConnection } = require('../database/config');
// const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);

        // Asignar path de endpoint por entidad o controller
        this.paths = {
            auth: '/api/auth',
            user: '/api/user',
            police: '/api/police',
        }


        // Conectar a base de datos en caso hubiera

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // Configurar CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        // this.app.use(express.static('public'));

        // Fileupload - Carga de archivos
        // this.app.use(fileUpload({
        //     useTempFiles: true,
        //     tempFileDir: '/tmp/',
        //     createParentPath: true
        // }));

    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.police, require('../routes/police'));

    }


    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io))
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;