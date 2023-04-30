require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development'
const Server = require('./config/server');
const server = new Server();

if (NODE_ENV !== 'test') {
    server.listen();
}

module.exports = server.app;