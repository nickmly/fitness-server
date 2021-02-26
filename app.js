require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB
});

// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.get('/exercises', (req, res) => {
  connection.query('SELECT * FROM exercises', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(8000, () => {
  console.log("server listening on port 8000");
});