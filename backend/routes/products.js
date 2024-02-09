const express = require('express')
const router = express.Router()
const Product = require("../models/Product")
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name:'dzugrk6ni',
    api_key:'427138549222556',
    api_secret:'dU6V60kySj4ND3SzUC-cWf-l3g4'
})


// CREATE PRODUCT
router.post("/create-product" , async(req,res) => {
    try{
        const file = req.files.photo;
        cloudinary.uploader.upload(file.tempFilePath , async(err , result) => {
            const newProduct = await Product({
                image:result.url,
                name:req.body.name,
                color:req.body.color,
                price:req.body.price,
                summary:req.body.summary,
                description:req.body.description,
                category:req.body.category
            })
            const response = await newProduct.save()
            res.status(200).json({"success":true,"data":response})
        })


    }catch(err){
        res.status(500).json({"success":false,"reason":err})
    }
})

// READ PRODUCT
router.get("/read-product" , async(req,res) => {
    try{
        const response = await Product.find();
        res.status(200).json({"success":true,"data":response})
    }catch(err){
        res.status(500).json({"success":false,"reason":err})
    }
})

// READ PARTICULAR PRODUCT
router.get("/product/:id" , async(req,res) => {
    const id = req.params.id
    try{
        const response = await Product.findOne({_id:id});
        res.status(200).json({"success":true,"data":response})
    }catch(Err){
        res.status(500).json({"success":false,"reason":Err})
    }
})


// DELETE PRODUCT
router.delete("/delete-product/:id" , async(req,res) => {
    try{
        const id = req.params.id
        const response = await Product.findByIdAndDelete({_id:id})
        res.status(200).json({"success":true , "data" : response})
    }catch(err){
        res.status(500).json({"success":false,"reason":err})
    }
})

// EDIT PRODUCT
router.put("/edit-product/product/:id" , async(req,res) => {
    const id = req.params.id;
    const { name, color, price, summary, description, category } = req.body;
    try{
        if (req.files && req.files.photo) {
            const file = req.files.photo;
            cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
                if (err) {
                    return res.status(500).json({ "success": false, "reason": "Error uploading image" });
                }
                try {
                    const response = await Product.findByIdAndUpdate(
                        { _id: id },
                        {
                            image: result.url,
                            name,
                            color,
                            price,
                            summary,
                            description,
                            category
                        },
                        {
                            new: true
                        }
                    );
                    res.status(200).json({ "success": true, "data": response });
                } catch (err) {
                    res.status(500).json({ "success": false, "reason": err.message });
                }
            });
        } else {
            // Handle the case where no file is provided
            const response = await Product.findByIdAndUpdate(
                { _id: id },
                {
                    name,
                    color,
                    price,
                    summary,
                    description,
                    category
                },
                {
                    new: true
                }
            );
            res.status(200).json({ "success": true, "data": response });
        }
        // const response = await Product.findByIdAndUpdate({_id:id} , req.body , {
        //     new:true
        // })
    }catch(err){
        res.status(500).json({"success":false,"reason":err})
    }
})


// SEARCH PRODUCT
router.get("/search-product" , async(req,res) => {
    const searchTerm = req.query.q;
    try{
        const response = await Product.find({
            $or: [
              { name: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
              { description: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
              { summary: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
              { category: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
            ],
          });
        res.status(200).json({"success":true , "data" : response})
    }catch(err){
        res.status(500).json({"success":false,"reason":err})
    }
})

module.exports = router