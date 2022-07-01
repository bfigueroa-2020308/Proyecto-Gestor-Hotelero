'use strict'

const jwt = require('jwt-simple');
const moment= require('moment');

const secretKey = 'Hotelito'

exports.creatToken = async(user)=>{
    try{
        const payload={
            sub: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            username: user.username,
            role: user.role,
            iat: moment().unix(),
            exp: moment().add(2,'hour').unix()
        }
        return jwt.encode(payload,secretKey);
    }catch(err){
        console.log(err);
        return err;
    }
}