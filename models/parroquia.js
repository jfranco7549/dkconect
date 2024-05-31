const mongoose = require('mongoose')
const { Schema } = mongoose;

const parroquia  = new  Schema({
    
    cod_parroquia:String,
    nombre:String,
    id_mun:String,
    id_entidad:String,

 

})

module.exports = mongoose.model('parroquia',parroquia,'parroquia');