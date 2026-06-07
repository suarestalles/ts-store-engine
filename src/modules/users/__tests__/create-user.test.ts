import { buildApp } from "../../../app/app";
import supertest from "supertest";
import { clearDataBase } from "../../../tests/setup";

let server: any;

beforeAll(async () => {
  const app = await buildApp();
  server = app.server;
});

beforeEach(async () => {
  await clearDataBase();
})

test("create user", async () => {
  const response = await supertest(server)
    .post("/users")
    .send({
      name: "Talles",
      email: "test@test.com",
      password: "123456",
    });

  expect(response.statusCode).toBe(201);
});