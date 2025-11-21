const mongoose = require('mongoose')

let partnersSchema= new mongoose.Schema({
    companyname:String,
    image:String 
    
})

module.exports = mongoose.model("partners",partnersSchema)