const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  db.query('SELECT * FROM exercises', function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
});

router.post('/', (req, res) => {
  db.query(`INSERT INTO exercises(title,muscles,equipment) VALUES('${req.body.title}', '${req.body.muscles}', '${req.body.equipment}')`, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json('Success');
  });
});

module.exports = router;