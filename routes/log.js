const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../database');

router.get('/', (req, res) => {
  db.query(`SELECT * FROM logs WHERE user_id='${req.query.uid}' AND date='${req.query.date}'`, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
});

router.post('/', (req, res) => {
  const id = uuidv4();
  db.query(`INSERT INTO logs(id, date, user_id) VALUES('${id}', '${req.body.date}', '${req.body.uid}')`, function (error, results, fields) {
    if (error) throw error;
    res.status(200).send(id);
  });
});

module.exports = router;