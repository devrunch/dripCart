const express = require('express')
const router = express.Router()
const Whatsapp = require("../models/Whatsapp")

router.post("/add-whatsapp-number" , async(req,res) => {
    const addNumber = await Whatsapp({
        'number' : req.body.number
    })
    const response = await addNumber.save()
    res.status(200).json({"success":true , 'data':response})
})


router.get("/read-whatsapp-number" , async(req,res) => {
    const response = await Whatsapp.find({_id:'65ba51f814a115c1a301741e'})
    res.status(200).json({"success":true , 'data':response})
})

router.put("/change-whatsapp-number" , async(req,res) => {
    try{
        const response = await Whatsapp.findByIdAndUpdate({_id:'65ba51f814a115c1a301741e'} , req.body , {new:true})
        res.status(200).json({"success":true , 'data':response})
    }catch(err){
        res.status(500).json({"success":'false' , 'reason':err})
    }
    
})

module.exports = router;