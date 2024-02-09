const mongoose = require('mongoose')

const whatsappSchema = new mongoose.Schema({
    number : Number
})

const whatsappModel = new mongoose.model('Whatsapp' , whatsappSchema)

module.exports = whatsappModel