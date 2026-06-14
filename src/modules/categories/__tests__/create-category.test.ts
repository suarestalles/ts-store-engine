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

test("create category", async () => {
  const response = await supertest(server)
    .post("/categories")
    .send({
      name: "House",
    });

  expect(response.statusCode).toBe(201);
});