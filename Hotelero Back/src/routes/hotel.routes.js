'use strict'

const express=require('express');
const hotelController = require('../controllers/hotel.controller');
const app = express.Router();
const mdAuth = require('../authorization/authenticate');

app.get('/test', hotelController.test);
app.post('/agregarHotel',[mdAuth.ensureAuth, mdAuth.isHotelAdmin], hotelController.agregarHotel);
app.delete('/eliminar/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], hotelController.eliminarHotel);
app.put('/actualizar/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], hotelController.actualizarHotel);
app.get('/hoteles', hotelController.mostrarHoteles);
app.get('/mostrarHotel/:id', hotelController.mostrarHotel);

module.exports = app;