'use strict'

const moongose = require('mongoose');

const servicioSchema = {
    nombre : String,
    precio : Number
}

module.exports = moongose.model('Servicio', servicioSchema);