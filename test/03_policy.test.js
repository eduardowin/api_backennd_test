const request = require("supertest");
const app = require("../app");
const { testAuthLoginUser, testAuthLoginAdmin, userIdRoleUser, userIdRoleAdmin } = require("./helpers/data-helper");
let JWT_TOKEN = "";

beforeAll(async() => {

    // We can delete data that we will previously use to insert in the DB

    // Get Token JWt
    JWT_TOKEN = await getJWtFromResponse(testAuthLoginAdmin);

});

describe('[Get Policies]', () => {

    test("should return 403 - Forbidden", async() => {

        const response = await request(app)
            .get(`/api/policies?userName=Brit`)
            .set("Authorization", `Bearer 0`);

        expect(response.statusCode).toEqual(403);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe('Invalid token');

    });

    test("should return 400 - schema query validate", async() => {

        const response = await request(app)
            .get(`/api/policies?other=Brit`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('The parameter userName is mandatory in the query');

    });


    test("should return 401 - Unauthorized For User Role", async() => {

        // Get JWT
        JWT_TOKEN = await getJWtFromResponse(testAuthLoginUser);

        const response = await request(app)
            .get(`/api/policies?userName=Brit`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);

        expect(response.statusCode).toEqual(401);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe("The service requires one of these roles:admin");

    });

    test("should return 200", async() => {

        // For Admin
        // Get JWT
        JWT_TOKEN = await getJWtFromResponse(testAuthLoginAdmin);

        // Response api
        const responseUserAdmin = await request(app)
            .get(`/api/policies?userName=Brit`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);
        expect(responseUserAdmin.statusCode).toEqual(200);
        expect(responseUserAdmin.body).toHaveProperty('code');
        expect(responseUserAdmin.body).toHaveProperty('result');
        const lenghtResult = responseUserAdmin.body.result.length;
        expect(lenghtResult).toBeGreaterThan(0);
        expect(responseUserAdmin.body.result[0]).toHaveProperty('id');
        expect(responseUserAdmin.body.result[0]).toHaveProperty('amountInsured');
        expect(responseUserAdmin.body.result[0]).toHaveProperty('email');
        expect(responseUserAdmin.body.result[0]).toHaveProperty('inceptionDate');
        expect(responseUserAdmin.body.result[0]).toHaveProperty('installmentPayment');
        expect(responseUserAdmin.body.result[0]).toHaveProperty('clientId');
        expect(responseUserAdmin.body.result[0]).toHaveProperty('name');

        // Missing pagination

    });

})

const getJWtFromResponse = async(testAuth) => {

    // Get JWT
    const responseAdmin = await request(app)
        .post("/api/auth/login")
        .send(testAuth);

    JWT_TOKEN = responseAdmin.body.token;

    return JWT_TOKEN;
}