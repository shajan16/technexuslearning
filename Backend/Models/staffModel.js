const mongoose = require('mongoose')

let staffaccountSchema= new mongoose.Schema({
    name:String,
    phone:String,
    role:String,
    password:String,
})

module.exports = mongoose.model("staff",staffaccountSchema);