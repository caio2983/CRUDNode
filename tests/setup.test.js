const request = require("supertest");
const app = require("../app.js");
const pool = require("../database/db.js");
// docker exec -it <container's id>  /bin/bash
// npm run test

describe("setup /setup", () => {
  afterAll(async () => {
    await pool.query("DELETE FROM orders");
    await pool.query("DROP TABLE IF EXISTS orders");
    await pool.end();
  });

  it("should create a new orders table", async () => {
    const response = await request(app).get("/setup");
    expect(response.status).toBe(200);

    const responsePost = await request(app).post("/order");
    expect(responsePost.status).toBe(200);

    const responseGet = await request(app).get("/");
    expect(Array.isArray(responseGet.body)).toBe(true);
    expect(responseGet.body.length).toBe(1);
    expect(responseGet.body[0]).toHaveProperty("id");
    expect(responseGet.body[0]).toHaveProperty("amount");
  });
});
