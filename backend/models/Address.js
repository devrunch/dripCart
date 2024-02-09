const mongoose = require('mongoose')
const cartModel = require('./Cart')
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
const AddressSchema = new mongoose.Schema({
    deviceId:String,
    name:String,
    email:String,
    mob:String,
    address:String,
    paymentMode:String,
    products:[cartSchema],
    totalPrice:Number,
    order_id:String,
    razorpay_payment_id:{
        type:String,
        default:null
    },
    razorpay_order_id:{
        type:String,
        default:null
    },
    razorpay_signature:{
        type:String,
        default:null
    },
    paymentStatus:{
        type:Boolean,
        default:null
    }
})

const AddressModel = new mongoose.model("Address" , AddressSchema)

module.exports = AddressModel