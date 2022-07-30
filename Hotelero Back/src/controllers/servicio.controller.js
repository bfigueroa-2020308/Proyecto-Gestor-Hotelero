'use strict'

const Servicio = require('../models/servicio.model');
const {validateData, checkUpdate} = require('../services/validate');

exports.test = async(req,res)=>{
    try{
        return res.send({message:'Test corriendo'});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.agregarServicio = async(req,res)=>{
    try{
        const params = req.body;
        const data = {
            nombre : params.nombre,
            precio : params.precio
        }
        const msg = await validateData(data);
        if(!msg){
            const servicio = await new Servicio(data);
            servicio.save();
            return res.send({message:'Servicio Agregado', servicio});
        }else{
            return res.status(400).send(msg); 
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarServicion = async(req,res)=>{
    try{
        const servicioID = req.params.id;
        const existingServicio = await Servicio.findOne({_id : servicioID});
        if(existingServicio){
            const deletedServicio = await Servicio.findOneAndDelete({_id:servicioID});
            if(deletedServicio){
                return res.send({message:'Servicio Eliminado Satisfactoriamente'});
            }else{
                return res.status(400).send({message:'El servicio no pudo ser eliminado'});
            }
        }else{
            return res.status(404).send({message:'Servicio No Encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarServicio = async(req,res)=>{
    try{
        const servicioID = req.params.id;
        const params = req.body;
        const check = await checkUpdate(params);
        if(check===true){
            const existingServicio = await Servicio.findOne({_id:servicioID});
            if(existingServicio){
                if(existingServicio.nombre === params.nombre){
                    const  updatedServicio = await Servicio.findOneAndUpdate({_id:servicioID}, params,{new:true});
                    return res.send({message:'Servicio actualizado', updatedServicio});
                }else{
                    const existingName = await Servicio.findOne({nombre:params.nombre});
                    if(!existingName){
                        const updatedServicio = await Servicio.findOneAndUpdate({_id:servicioID}, params,{new:true});
                        return res.send({message:'Servicio Actualizado', updatedServicio});
                    }else{
                        return res.status(400).send({message:'Ya hay un servicio con ese nombre'});
                    }
                }
            }else{
                return res.status(404).send({message:'Servicio no encontrado'});
            }
        }else{
            return res.status(400).send({message:'Parametros no actualizables o vacios'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verServicios = async(req,res)=>{
    try{
        const servicios = await Servicio.find();
        if(servicios){
            return res.send({servicios});
        }else{
            return res.status(404).send({message:'Servicios no encontrados'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verServicio = async(req,res)=>{
    try{
        const servicioID = req.params.id;
        const servicio = await Servicio.findOne({_id:servicioID});
        if(servicio){
            return res.send({servicio});
        }else{
            return res.status(404).send({message:'Servicio No encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}