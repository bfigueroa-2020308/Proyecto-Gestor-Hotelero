'use strict'

const moongose = require('mongoose');

const habitacionSchema = {
    numero : Number,
    descripcion: String,
    precio : Number,
    reservada : Boolean,
    ocupada : Boolean,
    hotel : {type: moongose.Schema.ObjectId, ref:'Hotel'}, 
    user :{type:moongose.Schema.ObjectId, ref:'User'}
}

module.exports = moongose.model('Habitacion', habitacionSchema);