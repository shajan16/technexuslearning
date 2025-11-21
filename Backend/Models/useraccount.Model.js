const mongoose = require('mongoose')

let useraccountSchema= new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    password:String,

    resetOtp: String,
    resetOtpExpire: Date,
})

module.exports = mongoose.model("Signup",useraccountSchema)