import request from "supertest";
import { app } from "../../app";

it("retorna 201 tras registro exitoso", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test1@test.com",
      password: "password",
    })
    .expect(201);
});

it("retorna 400 con un email inválido", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "asdfasdf",
      password: "password",
    })
    .expect(400);
});

it("retorna 400 con una contraseña inválido", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "asdfasdf",
      password: "p",
    })
    .expect(400);
});

it("retorna 400 sin email ni contraseña", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ password: "password" })
    .expect(400);
});

it("no se permiten emails duplicados", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("coloca una cookie tras un registro exitoso", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
