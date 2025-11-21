const mongoose = require('mongoose')

let wregsiterSchema= new mongoose.Schema({
    name:String,
    phone:String,
    email:String
})

module.exports = mongoose.model("workshop-register",wregsiterSchema)