const request = require("supertest");
const app = require("../app");
const { testAuthLoginUser } = require("./helpers/data-helper");

test("should return 401 Unauthorized", async() => {
    const newTestAuthLogin = {...testAuthLoginUser, password: "22222222" }
    const response = await request(app)
        .post("/api/auth/login")
        .send(newTestAuthLogin);

    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("code");
    expect(response.body).toHaveProperty("msg");
    expect(response.body.code).toBe(1);
    expect(response.body.msg).toBe("User / Password are not correct - password");
});

test("should validate schema data in body", async() => {

    const response = await request(app)
        .post("/api/auth/login")
        .send({});

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.body.errors[0].msg).toBe('Email is mandatory');
    expect(response.body.errors[1].msg).toBe('Password is mandatory');
});

test("should return 200 successful login", async() => {
    const response = await request(app)
        .post("/api/auth/login")
        .send(testAuthLoginUser);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');

});