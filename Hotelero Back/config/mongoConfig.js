'use strict'

const moongose = require('mongoose');

exports.init=()=>{
    const uriMongo = 'mongodb://127.0.0.1:27017/HotelesDB'
    moongose.Promise = global.Promise;
    moongose.connection.on('error',()=>{
        console.log('ERROR || No se pudo conectar con MongoDB');
        moongose.disconnect();
    })
    moongose.connection.on('connecting',()=>{
        console.log('Conectando a MongoDB, por favor espere...');
    })
    moongose.connection.on('connected', ()=>{
        console.log('Conectado a MongoDB');
    })
    moongose.connection.once('open', ()=>{
        console.log('Conectado a la base de datos')
    })
    moongose.connection.on('reconnected',()=>{
        console.log('Reconectado a la base de datos');
    })
    moongose.connection.on('disconnectd',()=>{
        console.log('Desconectado');
    })
    moongose.connect(uriMongo,{
        maxPoolSize : 50,
        useNewUrlParser: true,
        connectTimeoutMS: 3000
    }).catch(err=>console.log(err))
}
