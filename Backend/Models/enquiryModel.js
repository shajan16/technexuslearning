const mongoose = require('mongoose')

let enquireSchema= new mongoose.Schema({
    name:String,
    qualification:String,
    for:String,
    phone:String,
    email:String
})

module.exports = mongoose.model("Enquire",enquireSchema)