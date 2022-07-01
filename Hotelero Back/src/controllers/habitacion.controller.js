'use strict'

const Habitacion = require('../models/habitacion.model');
const Hotel = require('../models/hotel.model');
const User = require('../models/usuario.model');
const {validateData, checkUpdate} = require('../services/validate');

exports.test = async(req,res)=>{
    return res.send({message:'test corriendo'})
}

exports.agregarHabitacion = async(req,res)=>{
    try{
        const params = req.body;
        const data = {
            descripcion : params.descripcion,
            precio : params.precio,
            hotel : params.hotel
        }
        const msg = await validateData(data);
        if(!msg){
            const hotelExist = await Hotel.findOne({_id:params.hotel});
            if(hotelExist){
                data.numero = await Habitacion.count() + 1;
                data.reservada = false;
                data.ocupada = false;
                const habitacion = await new Habitacion(data); 
                habitacion.save(); 
                return res.send({message:'Habitacion agregada', habitacion});    
            }else{
                return res.status(400).send({message:'El hotel no existe en la base de datos'});
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarHabitacion = async(req,res)=>{
    try{
        const habitacionID = req.params.id;
        const existingHabitacion = await Habitacion.findOne({_id:habitacionID});
        if(existingHabitacion){
            const habitacionDeleted = await Habitacion.findOneAndDelete({_id:habitacionID});
            if(habitacionDeleted){
                return res.send({message:'Habitacion eliminada satisfactoriamente'});
            }else{
                return res.status(401).send({message:'No se pudo eliminar la habitacion'});
            }
        }else{
            return res.status(404).send({message:'Habitacion no encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarHabitacion = async(req,res)=>{
    try{
        const habitacionID = req.params.id;
        const params = req.body;
        const check = await checkUpdate(params);
        if(check == true){ 
            const existingHabitacion = await Habitacion.findOne({_id:habitacionID});
            if(existingHabitacion){
                const userExist = await User.findOne({usuario:params.usuario});
                if(userExist){
                    const habitacionUpdated = await Habitacion.findOneAndUpdate({_id:habitacionID}, params,{new:true}).populate('hotel').populate('usuario').lean();
                    return res.send({message:'Habitacion Actualizada', habitacionUpdated});
                }else if(!userExist && !params.usuario){
                    const habitacionUpdated = await Habitacion.findOneAndUpdate({_id:habitacionID}, params,{new:true}).populate('hotel').populate('usuario').lean();
                    return res.send({message:'Habitacion Actualizada', habitacionUpdated});
                }else{
                    return res.status(404).send({message:'Usuario inexistente'})
                }
            }else{
                return res.status(404).send({message:'habitacion no encontrada'});  
            }
        }else{
            return res.status(400).send({message:'parametros no actualizables o vacios'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verHabitaciones = async(req,res)=>{
    try{
        const habitaciones = await Habitacion.find().populate('hotel').populate('usuario').lean();
        if(habitaciones){
            return res.send({habitaciones});
        }else{
            return res.status(404).send({message:'Habitaciones no encontradas'});   
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verHabitacion = async(req,res)=>{
    try{
        const habitacionID = req.params.id;
        const existingHabitacion = await Habitacion.findOne({_id:habitacionID}).populate('hotel').populate('usuario').lean();
        if(existingHabitacion){
            return res.send({existingHabitacion});
        }else{
            return res.status(404).send({message:'habitacion no encontrada'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}
