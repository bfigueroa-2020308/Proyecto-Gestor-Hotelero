'use strict'

const Hotel = require('../models/hotel.model');
const {validateData, checkUpdate}= require('../services/validate');

exports.test = async(req,res)=>{
    return res.send({message:'Test corriendo'});
}

exports.agregarHotel = async(req,res)=>{
    try{
        const params = req.body;
        const data = {
            nombre : params.nombre,
            direccion : params.direccion,
            administrador : req.user.sub
        }
        const msg = await validateData(data);
        if(!msg){
            const alreadyNombre = await Hotel.findOne({nombre:params.nombre});
            if(!alreadyNombre){
                const hotel = await new Hotel(data);
                hotel.save();
                return res.send({message:'Hotel Agregado', hotel});
            }else{
                return res.status(400).send({message:`El nombre ${params.nombre} ya esta siendo utilizado`})
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarHotel=async(req,res)=>{
    try{
        const hotelID = req.params.id;
        const hotelExist = await Hotel.findOne({_id:hotelID});
        if(hotelExist){
            const hotelDeleted = await Hotel.findOneAndDelete({_id:hotelID});
            if(hotelDeleted){
                return res.send({message:'Hotel eliminado satisfactoriamente'});
            }else{
                return res.status(401).send({message:'No se pudo eliminar el hotel'});
            }
        }else{
            return res.status(404).send({message:'El Hotel no existe'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarHotel = async(req,res)=>{
    try{
        const params = req.body;
        const hotelID = req.params.id;
        const check = await checkUpdate(params);
        if(check == true){
            const hotelExist = await Hotel.findOne({_id:hotelID});
            if(hotelExist){
                if(params.nombre == hotelExist.nombre){
                    const hotelUpdated = await Hotel.findOneAndUpdate({_id:hotelID}, params, {new:true}).populate('administrador').lean();
                    return res.send({message:'Usuario Actualizado', hotelUpdated});
                }else{
                    const alreadyName = await Hotel.findOne({nombre:params.nombre});
                    if(!alreadyName){
                        const hotelUpdated = await Hotel.findOneAndUpdate({_id:hotelID}, params,{new:true}).populate('administrador').lean();
                        return res.send({message:'Usuario Actualizado', hotelUpdated});
                    }else{
                        res.send({message:`El nombre ${params.nombre} ya esta en uso`});
                    }
                }
            }else{
                return res.status(404).send({message:'Empresa no encontrada'});
            }
        }else{
            return res.send({message:'Parametros no actualizables o vacios'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarHoteles = async(req,res)=>{
    try{
        const hoteles = await Hotel.find().populate('administrador').lean();
        if(hoteles){
            return res.send({hoteles})
        }else{
            return res.status(404).send({message:'Hoteles no encontrados'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarHotel = async(req,res)=>{
    try{
        const hotelID = req.params.id;
        const hotelExist = await Hotel.findOne({_id:hotelID}).populate('administrador').lean();
        if(hotelExist){
            return res.send({hotelExist})
        }else{
            return res.status(404).send({message:'Empresa no encontrada'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}