const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')


// ADD ITEM TO CART
router.post("/cart/add-item" , async(req,res) => {
    try{
        const addItem = new Cart({
            deviceId : req.body.deviceId,
            image:req.body.image,
            name:req.body.name,
            color:req.body.color,
            quantity:req.body.quantity,
            price:req.body.price,
            productId : req.body.productId
        })
        const response = await addItem.save()
        res.status(200).json({"success":true , "data":response})
    }catch(err){
        res.status(500).json({"success":false , "reason":err})
    }
})

// READ ITEM OF CART
router.get("/cart/items" , async(req,res) => {
    try{
        const deviceId = req.query.q
        const response = await Cart.find({deviceId:deviceId})
        res.status(200).json({"success":true , "data":response})
    }catch(err){
        res.status(500).json({"success":false , "reason":err})
    }
})

// DELETE CART ITEM
router.delete("/cart/delete-item/:id" , async(req,res) => {
    try{
        const id = req.params.id;
        const response = await Cart.findByIdAndDelete({_id:id})
        res.status(200).json({"success":true , "data":response})
    }catch(err){
        res.status(500).json({"success":false , "reason":err})
    }
})

//READ PARTICULAR ITEM
router.get("/cart/item/:id" , async(req,res) => {
    try{
        const id = req.params.id;
        const deviceId = req.query.q;
        const response = await Cart.find({$and:[{productId:id} , {deviceId:deviceId}]})
        if(response != ""){
            res.status(200).json({"success":true , "data":response})
        }
        else{
            res.status(200).json({"success":false , "data":"No Item Found"})
        }
    }catch(err){
        console.log(err);
    }
})


//EDIT QUANTITY OF ITEM
router.put('/update-cart-item/:id', async (req, res) => {
    const id = req.params.id;
    const deviceId = req.query.q;
  
    try {
      const response = await Cart.findOneAndUpdate(
        {$and:[{_id:id} , {deviceId:deviceId}]},
        { $set: { quantity: req.body.quantity } },
        { new: true }
      ); 

      res.status(200).json({"success":true , "data":response})

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports= router