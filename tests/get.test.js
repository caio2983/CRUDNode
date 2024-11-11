// docker exec -it <container's id>  /bin/bash
// npm run test

const request = require("supertest");
const app = require("../app.js");
const pool = require("../database/db.js");

describe("GET /", () => {
  beforeAll(async () => {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS orders(id UUID PRIMARY KEY, amount INT)"
    );
    await pool.query("INSERT INTO orders (id, amount) VALUES ($1, $2)", [
      "123e4567-e89b-12d3-a456-426614174000",
      1000,
    ]);
  });

  afterAll(async () => {
    await pool.query("DELETE FROM orders");
    await pool.query("DROP TABLE IF EXISTS orders");
    await pool.end();
  });

  it("should return a list of orders (orders)", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);

    expect(response.body.length).toBeGreaterThan(0);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("amount");
  });
});
