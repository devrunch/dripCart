const mongoose = require('mongoose')

const querySchema = new mongoose.Schema({
    name:String,
    email:String,
    contact:Number,
    query:String
})

const queryModel = new mongoose.model("Query" , querySchema)

module.exports = queryModel