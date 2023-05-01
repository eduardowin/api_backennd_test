const swaggerJsdoc = require("swagger-jsdoc");

/**
 * API Config Info
 */

const userSchema = {
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
    }
}

const policySchema = {
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
    }
}

const policyWithUserSchema = {
    ...policySchema,
    properties: {
        ...policySchema.properties,
        name: {
            type: "string",
        }
    }
}

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de backend test from axa",
        version: "1.0.1",
    },
    servers: [{
            url: "http://localhost:3000/api",
        },
        {
            url: "https://apibackendaxa.fly.dev/api",
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
            auth: {
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
            user: userSchema,
            policy: policySchema,
            resultList: {
                type: "object",
                properties: {
                    code: {
                        type: "number",
                    },
                    result: {
                        type: "array",
                        items: userSchema
                    }
                }
            },
            resultListPolicies: {
                type: "object",
                properties: {
                    code: {
                        type: "number",
                    },
                    result: {
                        type: "array",
                        items: policyWithUserSchema
                    }
                }
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