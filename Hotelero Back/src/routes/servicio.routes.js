'use strict'

const express = require('express');
const servicioController = require('../controllers/servicio.controller');
const mdAuth = require('../authorization/authenticate');
const app = express.Router();

app.get('/test', servicioController.test);
app.post('/agregar', [mdAuth.ensureAuth, mdAuth.isHotelAdmin],servicioController.agregarServicio);
app.delete('/eliminar/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], servicioController.eliminarServicion);
app.put('/actualizar/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], servicioController.actualizarServicio);
app.get('/servicios', servicioController.verServicios);
app.get('/verServicio/:id', [mdAuth.ensureAuth], servicioController.verServicio);

module.exports = app;