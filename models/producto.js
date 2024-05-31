const mongoose = require('mongoose')
const { Schema } = mongoose;

const producto = new  Schema({
    
 meleid:Number,

 sap:String,

 descripcion:String,

 linea:String,

})

module.exports = mongoose.model('producto',producto,'producto');