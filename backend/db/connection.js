const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/DripCreator").then(() => {
    console.log("Connected to the database Successfully!!");
}).catch((err) => {
    console.log("Failed to connect with database , Error is " , err);
})