'use strict'

const moongose = require('mongoose');

const historialSchema={
    habitacion : [{type: moongose.Schema.ObjectId, ref:'Habitacion'}],
    hotel: [{type: moongose.Schema.ObjectId, ref:'Hotel'}],
    user: {type: moongose.Schema.ObjectId, ref:'User'}
}

module.exports = moongose.model('Historial', historialSchema);