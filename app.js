require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB
});


app.use(cors());

app.get('/', (req, res) => {
  connection.query('SELECT * FROM exercises LIMIT 1', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(8000, () => {
  console.log("server listening on port 8000");
});