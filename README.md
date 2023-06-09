# Api Backend Test for Axa
This readme presents the considerations and commands needed in the different stages of the project development, from its creation to the deployment to production using fly.io cloud service, the project is under NodeJS and other known and supported libraries that will also be discussed below.

## Installation
The following libraries were installed with the commands:
```bash
npm i axios
```
- library to get the information from the endpoints, either by Get, Post, Put, Delete Http
```bash
npm i express
```
- is a web application framework for the Node.js software.
```bash
npm i express-validator
```
- Allows the validation of the input data to the endpoints, either by body, parameters or query in the urls.
```bash
npm i jsonwebtoken
```
- an implementation of JSON Web Tokens.
```bash
npm i swagger-jsdoc
```
- This library reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification.
```bash
npm i swagger-ui-express
```
- this module allows you to serve auto-generated swagger-ui generated API docs from express.

## Project structure
At the folder level we have:
- config, folder that stores data related to the configuration or assignment of fixed variables in the system, such as the constants or server class file, which stores the initial configuration of the nodeJs project.
- controllers,Using MVC pattern, the controller folder is responsible for extracting, modifying and providing data. Essentially, the controller is the link between user requests and the model.
- coverage, The coverage folder is generated by means of a command in the execution of the project tests, more on this later.
- docs, folder that stores the main configuration of the swagger documentation development.
- helpers, folder that stores many files or classes that can be reused in several processes.
- middlewares, is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle.
- models, contains the models or classes, or entities that you will use in the project.
- routes, refers to how an application’s endpoints (URIs) respond to client requests
- schemaValidation, Indicates and validates the schema of the fields necessary for the calls to the endpoints to run correctly.
- services, folder that stores the connection to the database or the source of the information.
- test, folder that stores all unit and integration tests.

## Execute project in development environment
There are two ways of executing the current project, in a local development environment:
```bash
node app.js
```
The above command is executed using pure node.

```bash
nodemon app.js
```
The above command is executed using the nodemon library, for development environment is good because it allows to refresh the application by detecting each change that is made.

```bash
# build the application in docker
$ docker build -t api-backend-test-axa .

run the application in docker
$ docker run -p 3000:3000 api-backend-test-axa
```
The application has its exposure in docker, since it is used to publish it in the fly.io cloud.

## Test in postman


## Unit Test/ Integration Test, Jest - Supertest
The integration tests seek to validate the different responses of the backend, another way to consider it is that it allows them to create the validation of use case tests, in the test folder. 

Some of the tests are:
- Validate that the login process, returns code status 200, or 401.
- Validate that the user endpoint returns code status 200, 403 or 400, validating also the responses of its body.
- For the Policy object, the validation is also similar.

Coverage:
The library used for this is Jest and supertest, an important functionality is the generation of "coverage", that allows to obtain the metrics of code that have been covered by the tests, the "coverage" report can be obtained in the folder "/coverage/index.html", and it can be updated by applying the following command:
```bash
node test
```

## SwaggerUI.
The main route is: http://localhost:3000/documentation,
here you can find the schemas and the endpoints used to obtain the login, user and policies objects.

En produccion la ruta es: https://apibackendaxa.fly.dev/documentation/

## Deploy to produccion.
The cloud service for production is fly.io, which is a platform technology as services, where you can publish different applications, using a docker container.

To start using this service it is necessary to register with an email and password and then install "flyctl", from https://fly.io/docs/hands-on/install-flyctl/,
and then know some commands like:

```bash
flyctl auth login
```
Allows to start user authentication

```bash
flyctl launch
```
This command allows you to configure the application for the first time, defining the name, the region, additional services and others to use.

```bash
flyctl deploy
```
Finally, you can use this command to push a new version to the production.

## Repository Github
https://github.com/eduardowin/api_backennd_test




