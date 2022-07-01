'use strict'

const express = require('express');
const app = express.Router();
const userController = require('../controllers/usuario.controller');
const mdAuth = require('../authorization/authenticate');

app.get('/test',[mdAuth.ensureAuth, mdAuth.isHotelAdmin] ,userController.test);
app.get('/usuarios', userController.mostrarUsuarios);
app.get('/usuario/:id', userController.mostrarUsuario);
app.post('/agregarUsuario', userController.crearUsuario);
app.post('/agregarHotelAdmin', [mdAuth.ensureAuth, mdAuth.isSuperAdmin] ,userController.crearHotelAdmin);
app.delete('/eliminarUsuario/:id',[mdAuth.ensureAuth, mdAuth.isSuperAdmin] ,userController.eliminarUsuario);
app.put('/actualizar/:id', [mdAuth.ensureAuth], userController.actualizarUsuario);
app.post('/login', userController.login);

module.exports = app;