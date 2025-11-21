const mongoose = require('mongoose')

let studentsSchema= new mongoose.Schema({
    name:String,
    role:String,
    about:String,
    joindate:String,
    enddate:String,
    profileimg:String,
    backgroundimg:String
    
})

module.exports = mongoose.model("students",studentsSchema)