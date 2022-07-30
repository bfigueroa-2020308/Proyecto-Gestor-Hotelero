'use strict'

const express =require('express')
const eventoController = require('../controllers/evento.controller');
const mdAuth = require('../authorization/authenticate');
const app = express.Router();

app.get('/test', eventoController.test);
app.post('/agregar',[mdAuth.ensureAuth, mdAuth.isHotelAdmin] ,eventoController.agregarEvento);
app.delete('/eliminar/:id',[mdAuth.ensureAuth, mdAuth.isHotelAdmin] ,eventoController.eliminarEvento);
app.put('/actualizar/:id',[mdAuth.ensureAuth, mdAuth.isHotelAdmin] ,eventoController.actualizarEvento);
app.get('/eventos', eventoController.verEventos);
app.get('/verEvento/:id', eventoController.verEvento);
app.get('/eventosHotel/:id', eventoController.verEventoPorHotel);

module.exports = app;