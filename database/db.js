const { Pool } = require("pg");
const pool = new Pool({
  host: "db",
  port: 5432,
  user: "user123",
  password: "password",
  database: "crudDB",
});

module.exports = pool;
