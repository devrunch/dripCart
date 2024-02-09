const express = require('express')
const router = express.Router()
const Query = require("../models/Query")

// ADD QUERY
router.post("/add-query" , async(req,res) => {
    try {     
        const newQuery = await Query({
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            query:req.body.query
        })
        const response = await newQuery.save()
        res.status(200).json({"success":true,"data":response})
    } catch (error) {
        res.status(500).json({"success":false,"reason":error})
    }
})

// READ QUERIES
router.get("/read-query" , async(req,res) => {
    try {     
        const response = await Query.find()
        res.status(200).json({"success":true,"data":response})
    } catch (error) {
        res.status(500).json({"success":false,"reason":error})
    }
})

// DELETE QUERIES
router.delete("/delete-query/:id" , async(req,res) => {
    try {     
        const id = req.params.id
        const response = await Query.findByIdAndDelete({_id:id})
        res.status(200).json({"success":true,"data":response})
    } catch (error) {
        res.status(500).json({"success":false,"reason":error})
    }
})

module.exports = router