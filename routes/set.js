const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../database');

router.post('/', (req, res) => {
  const id = uuidv4();
  db.query(`INSERT INTO sets(id, workout_id, reps, weight) VALUES('${id}', '${req.body.workout_id}', '${req.body.reps}', '${req.body.weight}')`, function (error, results, fields) {
    if (error) throw error;
    res.status(200).send(id);
  });
});

router.delete('/', (req, res) => {
  db.query(`DELETE FROM sets WHERE id='${req.query.id}'`, function (error, results, fields) {
    if (error) {
      res.status(500).send(error);
      throw error;
    }
    res.status(200).send("Success");
  });
});

module.exports = router;