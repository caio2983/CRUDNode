const request = require("supertest");
const app = require("../app.js");
const pool = require("../database/db.js");
// docker exec -it <container's id>  /bin/bash
// npm run test

describe("POST /order", () => {
  beforeAll(async () => {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS orders(id UUID PRIMARY KEY, amount INT)"
    );
  });

  afterAll(async () => {
    await pool.query("DELETE FROM orders");
    await pool.query("DROP TABLE IF EXISTS orders");
    await pool.end();
  });

  it("should insert a new order", async () => {
    const response = await request(app).post("/order");

    expect(response.status).toBe(200);

    const responseGet = await request(app).get("/");
    expect(Array.isArray(responseGet.body)).toBe(true);
    expect(responseGet.body.length).toBeGreaterThan(0);
    expect(responseGet.body[0]).toHaveProperty("id");
    expect(responseGet.body[0]).toHaveProperty("amount");
  });
});
