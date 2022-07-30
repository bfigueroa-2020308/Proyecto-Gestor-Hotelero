'use strict'

const mongoConfig = require('./config/mongoConfig');
const app = require('./config/app');
const port = process.env.PORT || 3000;

mongoConfig.init();
app.listen(port,()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})