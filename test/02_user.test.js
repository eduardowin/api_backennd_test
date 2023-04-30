const request = require("supertest");
const app = require("../app");
const { testAuthLoginUser, testAuthLoginAdmin, userIdRoleUser, userIdRoleAdmin } = require("./helpers/data-helper");
let JWT_TOKEN = "";

beforeAll(async() => {

    // We can delete data that we will previously use to insert in the DB

    // Get Token JWt
    JWT_TOKEN = await getJWtFromResponse(testAuthLoginAdmin);

});

describe('[Get User]', () => {
    test("should return 403 Forbidden", async() => {

        // For User
        const response = await request(app)
            .get(`/api/users/${userIdRoleUser}`)
            .set("Authorization", `Bearer 0`);

        expect(response.statusCode).toEqual(403);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe('Invalid token');

    });

    test("should validate schema data in param", async() => {

        const response = await request(app)
            .get(`/api/users/0`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('The id parameter is mandatory');

    });

    test("should return 404", async() => {

        const response = await request(app)
            .get(`/api/users/000000000`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);

        expect(response.statusCode).toEqual(404);
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe('User does not exist');

    });

    test("should return 200", async() => {

        // For User
        JWT_TOKEN = await getJWtFromResponse(testAuthLoginUser);
        const response = await request(app)
            .get(`/api/users/${userIdRoleUser}`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('role');

        // For Admin
        JWT_TOKEN = await getJWtFromResponse(testAuthLoginAdmin);
        const responseAdmin = await request(app)
            .get(`/api/users/${userIdRoleAdmin}`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);

        expect(responseAdmin.statusCode).toEqual(200);
        expect(responseAdmin.body).toHaveProperty('id');
        expect(responseAdmin.body).toHaveProperty('name');
        expect(responseAdmin.body).toHaveProperty('email');
        expect(responseAdmin.body).toHaveProperty('role');

    });
});

describe('[Get Users]', () => {


    test("should return 403 - Forbidden", async() => {

        const response = await request(app)
            .get(`/api/users?other=00000`)
            .set("Authorization", `Bearer 0`);

        expect(response.statusCode).toEqual(403);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe('Invalid token');

    });

    test("should return 400 - schema query validate", async() => {

        const response = await request(app)
            .get(`/api/users?other=00000`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('The name parameter is mandatory in the query');

    });


    test("should return 200 - with empty list", async() => {

        const response = await request(app)
            .get(`/api/users?name=00000000000000`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('result');
        expect(response.body.result).toHaveLength(0);

    });

    test("should return 200", async() => {

        // For User
        // Get JWT
        JWT_TOKEN = await getJWtFromResponse(testAuthLoginUser);
        const responseUser = await request(app)
            .get(`/api/users?name=Pa`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);

        expect(responseUser.statusCode).toEqual(200);
        expect(responseUser.body).toHaveProperty('code');
        expect(responseUser.body).toHaveProperty('result');
        const lenghtResultuser = responseUser.body.result.length;
        expect(lenghtResultuser).toBeGreaterThan(0);
        expect(responseUser.body.result[0]).toHaveProperty('id');
        expect(responseUser.body.result[0]).toHaveProperty('name');
        expect(responseUser.body.result[0]).toHaveProperty('email');
        expect(responseUser.body.result[0]).toHaveProperty('role');

        // For Admin
        // Get JWT
        JWT_TOKEN = await getJWtFromResponse(testAuthLoginAdmin);

        // Response api
        const responseUserAdmin = await request(app)
            .get(`/api/users?name=Pa`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);
        expect(responseUserAdmin.statusCode).toEqual(200);
        expect(responseUserAdmin.body).toHaveProperty('code');
        expect(responseUserAdmin.body).toHaveProperty('result');
        const lenghtResult = responseUserAdmin.body.result.length;
        expect(lenghtResult).toBeGreaterThan(0);
        expect(responseUserAdmin.body.result[0]).toHaveProperty('id');
        expect(responseUserAdmin.body.result[0]).toHaveProperty('name');
        expect(responseUserAdmin.body.result[0]).toHaveProperty('email');
        expect(responseUserAdmin.body.result[0]).toHaveProperty('role');

    });

})

describe('[Get User by Policy]', () => {

    test("should return 403 - Forbidden", async() => {

        const response = await request(app)
            .get(`/api/users/bypolice/64cceef9-3a01-49ae-a23b-3761b604800b`)
            .set("Authorization", `Bearer 0`);

        expect(response.statusCode).toEqual(403);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe('Invalid token');

    });

    test("should return 400 - schema query validate", async() => {

        const response = await request(app)
            .get(`/api/users/bypolice/0`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('The id parameter of the policy is mandatory.');

    });


    test("should return 401 - With role User", async() => {

        // Get JWT
        JWT_TOKEN = await getJWtFromResponse(testAuthLoginUser);

        const response = await request(app)
            .get(`/api/users/bypolice/64cceef9-3a01-49ae-a23b-3761b604800b`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);

        expect(response.statusCode).toEqual(401);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toBe('The service requires one of these roles:admin');

    });

    test("should return 200", async() => {

        // For Admin
        // Get JWT
        JWT_TOKEN = await getJWtFromResponse(testAuthLoginAdmin);

        // Response api
        const responseUserAdmin = await request(app)
            .get(`/api/users/bypolice/64cceef9-3a01-49ae-a23b-3761b604800b`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);
        expect(responseUserAdmin.statusCode).toEqual(200);
        expect(responseUserAdmin.body).toHaveProperty('id');
        expect(responseUserAdmin.body).toHaveProperty('name');
        expect(responseUserAdmin.body).toHaveProperty('email');
        expect(responseUserAdmin.body).toHaveProperty('role');

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