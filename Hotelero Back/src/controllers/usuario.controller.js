'use strict'

const User = require('../models/usuario.model');
const jwt = require('../services/jwt');
const bcrypt = require('bcrypt-nodejs');
const {validateData, checkUpdate} = require('../services/validate'); 

exports.test = async(req,res)=>{
    try{
        return res.send({message:'Test corriendo satisfactoriamente'});
    }catch(err){
        console.log(err);
        return err;
    }
}

// Creacion De Usuario SUPERADMIN (Al ejecutarse el programa)

exports.crearSuperAdmin = async()=>{
    try{
        const existAdmin = await User.findOne({role:'SUPERADMIN'});
        if(!existAdmin){
            const superAdmin = await new User({
                nombre: 'SinNombre',
                apellido: 'SinApellido',
                username: 'SuperAdmin',
                password: bcrypt.hashSync('123456'),
                role: 'SUPERADMIN'
            })
            superAdmin.save();
        }else{
            console.log('SUPERADMIN Existente')
        }
    }catch(err){
        console.log(err);
        return err;
    }
}
this.crearSuperAdmin();

//CRUD de usuario

exports.crearUsuario = async(req,res)=>{
    try{
        const params = req.body;
        const data ={
            nombre : params.nombre,
            apellido : params.apellido,
            password: params.password,
            username: params.username,
            role : 'CLIENT'            
        }
        const msg = await validateData(data)
        if(!msg){
            let existingUser = await User.findOne({username : params.username});
            if(!existingUser){
                data.password = bcrypt.hashSync(params.password);
                let newUser = await new User(data); 
                newUser.save();
                return res.send({message:'Usuario Agregado!', newUser})    
            }else{
                return res.status(400).send({message:`El nombre de usuario '${data.username}' no esta disponible, por favor elija otro`})
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.crearHotelAdmin = async(req,res)=>{
    try{
        const params = req.body;
        const data ={
            nombre : params.nombre,
            apellido : params.apellido,
            username : params.username,
            password : params.password,
            role : 'HOTELADMIN'
        }
        const msg = await validateData(data);
        if(!msg){
           let existingUser = await User.findOne({username:params.username});
           if(!existingUser){
                data.password = bcrypt.hashSync(params.password)
                const newUser = await new User(data);
                newUser.save();
                return res.send({message:'Usuario Agregado!', newUser});
           }else{
                return res.status(400).send({message:`El nombre de usuario '${data.username}' no esta disponible, por favor elija otro`});
           }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarUsuario = async(req,res)=>{
    try{
        const userId = req.user.sub;
        const existingUser = await User.findOne({_id:userId});
        if(existingUser){
            if(existingUser.role!='SUPERADMIN'){
                const deletedUser = await User.findOneAndDelete({_id:userId});
                if(deletedUser){
                    return res.send({message:'Usuario Eliminado Satisfactoriamente', deletedUser});
                }else{
                    return res.status(400).send({message:'El usuario no pudo ser eliminado'});
                }    
            }else{
                return res.status(400).send({message:'No puedes eliminar este usuario'})
            }
        }else{
            return res.status(404).send({message:'Usuario no encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarUsuario = async(req,res)=>{
    try{
        const params = req.body;
        const userId = req.user.sub;
        const check = await checkUpdate(params);
        if(check == true){
            const userExist = await User.findOne({_id:userId});
            if(userExist){
                if(params.username == userExist.username){
                    const userUpdated = await User.findOneAndUpdate({_id:userId},params,{new:true});
                    return res.send({message:'Usuario Actualizado', userUpdated});
                }else{
                    const alreadyUsername = await User.findOne({username:params.username});
                    if(!alreadyUsername){
                        const userUpdate = await User.findOneAndUpdate({_id:userId}, params,{new:true});
                        return res.send({message:'Usuario Actualizado', userUpdate});
                    }else{
                        return res.status(400).send({message:`El nombre de usuario ${params.username}, no esta disponible`})
                    }
                }
            }else{
                return res.status(404).send({message:'Usuario no encontrado'})
            }
        }else{
            return res.status(400).send({message:'No puedes actualizar este usuario, o los parametros vienen vacios, o un parametro no es actualizable'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.login = async(req,res)=>{
    try{
        const params = req.body;
        const data = {
            username : params.username,
            password : params.password
        }
        const msg = await validateData(data)
        if(!msg){
            const userExist = await User.findOne({username:params.username});
            if(userExist){
                const passwordDecrypt = bcrypt.compareSync(params.password, userExist.password);
                if(userExist.username == params.username && passwordDecrypt == true){
                    const token = await jwt.creatToken(userExist);
                    return res.send({message:'Loggeado Satisfactoriamente, Bienvenido', token, userExist})
                }else{
                    return res.status(400).send({message:'Credenciales invalidas'})
                }
            }else{
                return res.status(404).send({message:'Usuario Inexistente'});
            }
        }else{
            return res.status(400).send(msg)
        }
    }catch(err){
        console.log(err);
    }
}

exports.mostrarUsuarios = async(req,res)=>{
    try{
        const users = await User.find()
        if(users){
            return res.send({users});
        }else{
            return res.status(404).send({message:'Usuarios no encontrados'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarUsuario = async(req,res)=>{
    try{
        const userID = req.params.id;
        const user = await User.findOne({_id:userID})
        if(user){
            return res.send({user})
        }else{
            return res.status(404).send({message:'Usuario no encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarHotelAdmins = async(req,res)=>{
    try{
        const hotelAdmins = await User.find({role:'HOTELADMIN'});
        if(hotelAdmins){
            return res.send({hotelAdmins});
        }else{
            return res.status(404).send({message:'usuarios no encontrados'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}