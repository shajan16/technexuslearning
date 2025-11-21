const mongoose = require('mongoose')

let workshopSchema= new mongoose.Schema({
    image:String,
})

module.exports = mongoose.model("workshop",workshopSchema)