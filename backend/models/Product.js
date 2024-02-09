const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image:String,
    name:String,
    color:String,
    price:Number,
    summary:String,
    description:String,
    category:String
})

const productModel = new mongoose.model("Product" , productSchema)

module.exports = productModel;