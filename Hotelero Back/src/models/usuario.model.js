'use strict'

const mongoose = require('mongoose')

const userSchema ={
    nombre : String,
    apellido : String,
    username : String,
    password : String,
    role : String
}

/* ROLES A UTILIZAR
    Administrador de aplicacion: SUPERADMIN
    Administrador de hotel : HOTELADMIN
    Usuario comun : CLIENT
*/

module.exports = mongoose.model('User', userSchema);