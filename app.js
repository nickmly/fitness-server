require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// use cors
app.use(cors());

app.get('/exercises', (req, res) => {
  connection.query('SELECT * FROM exercises', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/log', (req, res) => {
  connection.query(`SELECT * FROM logs WHERE user_id='${req.query.uid}' AND date='${req.query.date}'`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/log', (req, res) => {
  const id = uuidv4();
  connection.query(`INSERT INTO logs(id, date, user_id) VALUES('${id}', '${req.body.date}', '${req.body.uid}')`, function (error, results, fields) {
    if (error) throw error;
    res.send(id);
  });
});


app.get('/workout', (req, res) => {
  const id = uuidv4();
  connection.query(`SELECT * FROM workouts WHERE log_id='${req.query.log_id}'`, function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/workout', (req, res) => {
  const id = uuidv4();
  connection.query(`INSERT INTO workouts(id, log_id, exercise_id) VALUES('${id}', '${req.body.log_id}', '${req.body.exercise_id}')`, function (error, results, fields) {
    if (error) throw error;
    res.send(id);
  });
});


app.get('/sets', (req, res) => {
  connection.query(`SELECT * FROM sets WHERE workout_id='${req.query.workout_id}'`, function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/set', (req, res) => {
  const id = uuidv4();
  connection.query(`INSERT INTO sets(id, workout_id, reps, weight) VALUES('${id}', '${req.body.workout_id}', '${req.body.reps}', '${req.body.weight}')`, function (error, results, fields) {
    if (error) throw error;
    res.send(id);
  });
});

app.listen(8000, () => {
  console.log("server listening on port 8000");
});