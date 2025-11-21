const mongoose = require('mongoose')

let demovidoeSchema= new mongoose.Schema({
    video:String,
})

module.exports = mongoose.model("demovideo",demovidoeSchema)