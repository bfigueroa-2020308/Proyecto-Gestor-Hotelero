'use strict'

exports.validateData = (data)=>{
    let keys = Object.keys(data);
    let msg = '';
    for(let key of keys){
        if(data[key] != null && data[key]!= undefined && data[key]!=''){
            continue;
        }else{
            msg += `El parametro ${key} es requerido \n`
        }
    }
    return msg
}

exports.checkUpdate = async(user)=>{
    try{
        if(Object.entries(user).length == 0 || user.role || user.password || user.hotel || user.numero){
            return false
        }else{
            return true;
        }
    }catch(err){
        console.log(err);
        return err;
    }
}