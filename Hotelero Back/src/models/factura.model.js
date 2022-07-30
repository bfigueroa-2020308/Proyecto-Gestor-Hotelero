'use strict'

const moongose = require('mongoose');

const facturaSchema = {
    habitacion :{type: moongose.Schema.ObjectId, ref:'Habitacion'},
    usuario: {type: moongose.Schema.ObjectId, ref:'User'},
    total : Number
}

module.exports = moongose.model('Factura', facturaSchema);