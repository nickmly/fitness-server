require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB
});

app.get('/', (req, res) => {

  connection.connect();

  connection.query('SELECT * FROM exercises', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
  
});

app.listen(8000, () => {
  console.log("server listening on port 8000");
});