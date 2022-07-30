'use strict'

const moongose = require('mongoose');

const historialSchema={
    habitacion : [{type: moongose.Schema.ObjectId, ref:'Habitacion'}],
    servicios: [{type: moongose.Schema.ObjectId, ref:'Servicio'}],
    user: {type: moongose.Schema.ObjectId, ref:'User'}
}

module.exports = moongose.model('Historial', historialSchema);