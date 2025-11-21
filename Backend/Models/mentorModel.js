const mongoose = require('mongoose')

let imageSchema= new mongoose.Schema({
    mentorname:String,
    mentorrole:String,
    name:String,
    path:String 
    
})

module.exports = mongoose.model("mentors",imageSchema)