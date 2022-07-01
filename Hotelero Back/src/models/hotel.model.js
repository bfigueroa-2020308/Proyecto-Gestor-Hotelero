'use strict'

const moongose = require('mongoose');

const hotelSchema = {
    nombre: String,
    direccion: String, 
    administrador: {type: moongose.Schema.ObjectId, ref:'User'}
}

module.exports = moongose.model('Hotel', hotelSchema);