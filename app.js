require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');

// import routes
const exerciseRoutes = require('./routes/exercises');
const logRoutes = require('./routes/log');
const workoutRoutes = require('./routes/workout');
const setsRoutes = require('./routes/sets');
const setRoutes = require('./routes/set');

const {checkIfAuthenticated} = require('./auth.middleware.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// use cors
var corsOptions = {
  origin: process.env.ORIGIN_ALLOWED,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(checkIfAuthenticated);

// use routes
app.use('/exercises', exerciseRoutes);
app.use('/log', logRoutes);
app.use('/workout', workoutRoutes);
app.use('/sets', setsRoutes);
app.use('/set', setRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});