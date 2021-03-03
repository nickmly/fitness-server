const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../database');

router.get('/', (req, res) => {
  db.query(`SELECT * FROM workouts WHERE log_id='${req.query.log_id}'`, function (error, results, fields) {
    if (error) throw error;
    res.status(200).send(results);
  });
});

router.post('/', (req, res) => {
  const id = uuidv4();
  db.query(`INSERT INTO workouts(id, log_id, exercise_id) VALUES('${id}', '${req.body.log_id}', '${req.body.exercise_id}')`, function (error, results, fields) {
    if (error) throw error;
    res.status(200).send(id);
  });
});

router.delete('/', (req, res) => {
  db.query(`DELETE FROM workouts WHERE id='${req.query.workout_id}'`, function (error, results, fields) {
    if (error) throw error;
    res.status(200).send("Success");
  });
});

module.exports = router;