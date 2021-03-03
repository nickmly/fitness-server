const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  db.query(`SELECT * FROM sets WHERE workout_id='${req.query.workout_id}'`, function (error, results, fields) {
    if (error) throw error;
    res.status(200).send(results);
  });
});

router.delete('/', (req, res) => {
  db.query(`DELETE FROM sets WHERE workout_id='${req.query.workout_id}'`, function (error, results, fields) {
    if (error) {
      res.status(500).send(error);
      throw error;
    }
    res.status(200).send("Success");
  });
});

module.exports = router;