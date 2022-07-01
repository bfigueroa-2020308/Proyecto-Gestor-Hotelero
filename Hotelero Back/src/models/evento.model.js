'use strict'

const moongose = require('mongoose');

const eventoSchema ={
    nombre:String,
    descripcion:String,
    tipo: String,
    hotel: {type: moongose.Schema.ObjectId, ref:'Hotel'}
}

module.exports = moongose.model('Evento', eventoSchema);