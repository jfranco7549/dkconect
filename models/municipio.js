const mongoose = require('mongoose')
const { Schema } = mongoose;

const municipio = new  Schema({
    
    cod_mun:String,
    nombre:String,
    cod_entidad:String

 

})

module.exports = mongoose.model('municipio',municipio,'municipio');