const mongoose = require('mongoose')
const { Schema } = mongoose;

const img = new  Schema({
 
 sap:String,
 status:Boolean,
 
})

module.exports = mongoose.model('img',img,'img');