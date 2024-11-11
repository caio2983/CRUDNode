const express = require("express");
const { randomUUID } = require("crypto");
const pool = require("./database/db.js");
const port = 1337;

const app = express();
app.use(express.json());

// Returns the entire table
app.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM orders");
    res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Creates an order
app.post("/order", async (req, res) => {
  const id = randomUUID();
  amount = Math.round(Math.random() * 5000);
  try {
    await pool.query("INSERT INTO orders(id,amount) VALUES ($1,$2", {
      id,
      amount,
    });
    res.status(200).send({ message: "successfully added child" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Sets up the db
app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE orders(id NUMBER PRIMARY KEY, amount NUMBER )"
    );
    res.status(200).send({ message: "successfully created table" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`server has started on port ${port} `));
