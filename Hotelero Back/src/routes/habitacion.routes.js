'use strict'

const express = require('express');
const habitacionController = require('../controllers/habitacion.controller');
const mdAuth = require('../authorization/authenticate');

const app = express.Router();

app.get('/test', habitacionController.test);
app.post('/agregar', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], habitacionController.agregarHabitacion);
app.delete('/eliminar/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], habitacionController.eliminarHabitacion);
app.put('/actualizar/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], habitacionController.actualizarHabitacion)
app.get('/verHabitaciones', habitacionController.verHabitaciones);
app.get('/verHabitacion/:id', habitacionController.verHabitacion);

module.exports = app;