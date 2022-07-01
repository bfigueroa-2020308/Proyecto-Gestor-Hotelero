'use strict'

const moment = require('moment');
const jwt = require('jwt-simple');

const secretKey = 'Hotelito'

exports.ensureAuth=(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send({message: 'La cabecera de autenticacion no ha sido encontrada'});
    }else{
        try{
            let token = req.headers.authorization.replace(/['"]+/g,'')
            var payload = jwt.decode(token, secretKey);
        }catch(err){
            console.log(err);
            return res.status(400).send({message:'El token no es valido o ha expirado'})
        }
        req.user = payload;
        next();
    }
}

exports.isSuperAdmin = async(req,res,next)=>{
    try{
        const role = req.user.role;
        if(role === 'SUPERADMIN'){
            next()
        }else{
            return res.status(403).send({message:'Usuario No Autorizado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.isHotelAdmin = async(req,res,next)=>{
    try{
        const role=req.user.role;
        if(role === 'HOTELADMIN'){
            next();
        }else{
            return res.status(403).send({message:'Usuario No Autorizado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}