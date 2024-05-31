const mongoose = require('mongoose')
const { Schema } = mongoose;

const estado = new  Schema({
    
    cod_entidad:String,
    nombre:String

 

})

module.exports = mongoose.model('estado',estado,'estado');