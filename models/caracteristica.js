const mongoose = require('mongoose')
const { Schema } = mongoose;

const caracteristica = new  Schema({
 q:String,
 atributo:String,
 caracter:String,
 unidad:String,
})

module.exports = mongoose.model('caracteristica',caracteristica,'caracteristica');