const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    deviceId:String,
    image:String,
    name:String,
    color:String,
    quantity:{
        type:Number,
        default:1
    },
    price:Number,
    productId : String
})

const cartModel = new mongoose.model("Cart" , cartSchema)

module.exports = cartModel