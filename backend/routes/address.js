const express = require('express')
const router = express.Router()
const Address = require('../models/Address')
const Cart = require('../models/Cart')
const Razorpay = require('razorpay')
const crypto = require('crypto')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET,
});
router.post("/address/add", async (req, res) => {
    try {
        const carts = await Cart.find(
            {
                deviceId: req.body.deviceId,
            })
        // console.log(carts)
        let num = 0;
        carts.forEach(element => {
            num += element.price*element.quantity;
        });
        const order = await razorpay.orders.create({
            amount: Number(num * 100),
            currency: 'INR'
        })
        console.log(order)
        const addItem = new Address({
            deviceId: req.body.deviceId,
            name: req.body.name,
            email: req.body.email,
            mob: req.body.mob,
            address: req.body.address,
            products: carts,
            totalPrice: num,
            order_id: order.id,
            paymentMode: req.body.paymentMode
        })

        const response = await addItem.save()
        await Cart.deleteMany({ deviceId: req.body.deviceId });
        res.status(200).json({ "success": true, "data": order })
    } catch (err) {
        res.status(500).json({ "success": false, "reason": err })
    }
})
router.get('/orders', async (req, res) => {
    try {
        const orders = await Address.find();

        res.status(200).json({ "success": true, "data": orders })
    }
    catch (err) {
        res.status(500).json({ "success": false, "reason": err })
    }
})

router.post("/payment/payment-verification", async (req, res) => {
    console.log("verify - hit")
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

        const body_data = razorpay_order_id + "|" + razorpay_payment_id
        const expect = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
            .update(body_data).digest("hex")

        const isValid = expect === razorpay_signature;
        if (isValid) {
            await Address.findOneAndUpdate(
                { order_id: razorpay_order_id },
                { 
                  $set: { 
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                    paymentStatus:true
                  } 
                }
              );
            res.redirect(`http://localhost:3000/order-placed-successfully?payment_id=${razorpay_payment_id}`)
        }
        else {
            res.redirect("http://localhost:3000/failed")
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ "success": false, "reason": err })
    }
    
})
module.exports = router