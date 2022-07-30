'use strict'

const mongoose = require('mongoose');

const reservacionSchema = {
    fecha : Date,
    usuario : {type: mongoose.Schema.ObjectId, ref:'User'},
    habitacion : {type: mongoose.Schema.ObjectId, ref:'Habitacion'},
    servicios: {type: mongoose.Schema.ObjectId, ref:'Servicio'}
}

module.exports = mongoose.model('Reservacion', reservacionSchema);