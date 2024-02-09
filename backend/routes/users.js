const express = require('express')
const User = require("../models/User")
const router = express.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = "WebsiteIsDesignedAndDevelopedBySachinJha"

//CREATING USER
router.post("/create-user" , async(req,res) => {
    try{
        const newUser = await User({
            email:req.body.email,
            password: await bcryptjs.hash(req.body.password,10),
            admin:req.body.admin
        })
        const response = await newUser.save()
        res.status(200).json({"success":true,"data":response})
    }catch(err){
        res.status(500).json({"success":false,"reason":err})
    }
})

// LOGIN USER
router.post("/login" , async(req,res) => {
    try{
        const email = await req.body.email
        const myUser = await User.findOne({email:email})
        if(myUser.email){
            const verifyPassword = await bcryptjs.compare(req.body.password , myUser.password)
            if(verifyPassword){
                const data = {
                    userId : myUser._id,
                    admin : myUser.admin
                }
                const token = jwt.sign(data , secretKey)
                res.status(200).json({"success":true,"data":myUser , token : token})
                
            }
            else{
                res.status(400).json({"success":false,"reason":"Password Incorrect"})
            }
        }else{
            res.status(404).json({"success":false,"reason":"User Doesn't exist"})
        }

    }catch(Err){
        res.status(500).json({"success":false,"reason":Err})
    }
})

module.exports = router;