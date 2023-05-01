# Api Backend Test for Axa
This readme presents the considerations and commands needed in the different stages of the project development, from its creation to the deployment to production using fly.io cloud service, the project is under NodeJS and other known and supported libraries that will also be discussed below.

## Installation
The following libraries were installed with the commands:
- npm i axios, 

- npm i express
- npm i express-validator
- npm i jsonwebtoken
- npm i swagger-jsdoc

Estructuras de carpetas

Principales librerias:
Axios
nodemon

Nodemon

Development

Test in postman

Unit test

Docker

Deploy to produccion.

Agregar swaggerUi

fly.io
flyctl auth login
flyctl launch
flyctl deploy
flyctl status
Comment docker and yes or not redis, postgres and docker file.

In docker Local:
$ docker build -t basic-express-api .
$ docker run -p 3000:3000 basic-express-api

Swagger
https://apibackendaxa.fly.dev/documentation/



