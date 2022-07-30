'use strict'

const express = require('express');
const app = express.Router();
const userController = require('../controllers/usuario.controller');
const mdAuth = require('../authorization/authenticate');

app.get('/test',[mdAuth.ensureAuth, mdAuth.isHotelAdmin] ,userController.test);
app.get('/usuarios', [mdAuth.ensureAuth, mdAuth.isSuperAdmin],userController.mostrarUsuarios);
app.get('/usuario/:id',[mdAuth.ensureAuth, mdAuth.isSuperAdmin], userController.mostrarUsuario);
app.get('/hotelAdmins', userController.mostrarHotelAdmins);
app.post('/agregarUsuario', userController.crearUsuario);
app.post('/agregarHotelAdmin', [mdAuth.ensureAuth, mdAuth.isSuperAdmin] ,userController.crearHotelAdmin);
app.delete('/eliminarUsuario/:id',[mdAuth.ensureAuth] ,userController.eliminarUsuario);
app.put('/actualizar/:id', [mdAuth.ensureAuth], userController.actualizarUsuario);
app.post('/login', userController.login);

module.exports = app;