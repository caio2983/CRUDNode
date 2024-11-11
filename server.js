const express = require("express");
const pool = require("./database/db.js");
const port = 1337;

const app = express();

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => console.log(`server has started on port ${port} `));
