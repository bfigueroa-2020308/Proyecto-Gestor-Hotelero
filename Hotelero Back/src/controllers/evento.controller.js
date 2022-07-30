'use strict'

const Evento = require('../models/evento.model');
const Hotel = require('../models/hotel.model');
const {validateData, checkUpdate} = require('../services/validate');

exports.test= async(req,res)=>{
    try{
        return res.send({message:'Test corriendo'})
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.agregarEvento = async(req,res)=>{
    try{
        const params = req.body;
        const data ={
            nombre : params.nombre,
            descripcion : params.descripcion,
            tipo : params.tipo,
            hotel: params.hotel
        }
        const msg = await validateData(data);
        if(!msg){
            const existingHotel = await Hotel.findOne({_id:params.hotel})
            if(existingHotel){
                const evento = await new Evento(data);
                evento.save();
                return res.send({message:'Evento agregado', evento});
            }else{
                return res.status(400).send({message:'El hotel no ha sido encontrado'});
            }
        }else{
            return res.status(400).send(msg);   
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarEvento = async(req,res)=>{
    try{
        const eventoID = req.params.id;
        const existingEvento = await Evento.findOne({_id:eventoID});
        if(existingEvento){
            const eventoDeleted = await Evento.findOneAndDelete({_id:eventoID});
            if(eventoDeleted){
                return res.send({message:'Evento eliminado satisfactoriamente'});
            }else{
                return res.status(401).send({message:'No se pudo eliminar el evento'});
            }
        }else{
            return res.status(404).send({message:'Evento no encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarEvento = async(req,res)=>{
    try{
        const eventoID = req.params.id;
        const params = req.body;
        const check = await checkUpdate(params);
        if(check==true){
            const existingEvento = await Evento.findOne({_id:eventoID});
            if(existingEvento){
                const eventoUpdated = await Evento.findOneAndUpdate({_id:eventoID}, params,{new:true});
                return res.send({message:'Evento Actualizado', eventoUpdated});
            }else{
                return res.status(404).send({message:'Evento no encontrado'});
            }
        }else{
            return res.status(400).send({message:'Parametros no actualizables o vacios'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verEventos = async(req,res)=>{
    try{
        const eventos = await Evento.find();
        if(eventos){
            return res.send({eventos});
        }else{
            return res.status(404).send({message:'No hay eventos para mostrar'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verEvento = async(req,res)=>{
    try{
        const eventoID = req.params.id;
        const evento = await Evento.findOne({_id:eventoID});
        if(evento){
            return res.send({evento});
        }else{
            return res.status(404).send({message:'Evento no encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verEventoPorHotel = async(req,res)=>{
    try{
        const hotelID = req.params.id;
        const eventosHotel = await Evento.find({hotel:hotelID});
        if(eventosHotel){
            return res.send({eventosHotel});
        }else{
            return res.status(404).send({message:'Eventos no encontrados'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}