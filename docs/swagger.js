const swaggerJsdoc = require("swagger-jsdoc");

/**
 * API Config Info
 */

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de backend test from axa",
        version: "1.0.1",
    },
    servers: [{
            url: "http://localhost:3010/api",
        },
        {
            url: "https://afternoon-journey-32165.herokuapp.com/api",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },
        schemas: {
            authLogin: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },
            user: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                    },
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    role: {
                        type: "string",
                    }
                },
            },
            policy: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                    },
                    amountInsured: {
                        type: "number",
                    },
                    email: {
                        type: "string",
                    },
                    inceptionDate: {
                        type: "string",
                    },
                    installmentPayment: {
                        type: "boolean",
                    },
                    clientId: {
                        type: "string",
                    }
                },
            }

        }
    },
};

/**
 * Opciones
 */
const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
};

const openApiConfigration = swaggerJsdoc(options);

module.exports = openApiConfigration;