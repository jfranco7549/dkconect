const mongoose = require('mongoose')
const { Schema } = mongoose;

const categoria = new  Schema({
 
 atributo:String,
 icono:String,
 
})

module.exports = mongoose.model('categoria',categoria,'categoria');