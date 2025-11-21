const mongoose = require('mongoose')

let procoursesSchema= new mongoose.Schema({
    name:String,
    caption:String,
    about:String,
    price:String,
    courseicon:String,
    courseimg:String,
    coursevideo:String,
    coursesyllabus:String,
})

module.exports = mongoose.model("procourses",procoursesSchema)