const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email : String,
    password : String,
    admin : {
        type : Boolean,
        default : false
    }
})

const userModel = new mongoose.model("User" , userSchema)

module.exports = userModel;