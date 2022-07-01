'use strict'

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const userRoutes = require('../src/routes/user.routes');
const hotelRoutes = require('../src/routes/hotel.routes');
const habitacionRoutes = require('../src/routes/habitacion.routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/user', userRoutes);
app.use('/hotel', hotelRoutes);
app.use('/habitacion', habitacionRoutes);

module.exports = app;