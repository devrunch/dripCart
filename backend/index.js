const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config();
require("./db/connection")

app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get("/" , (req,res) => {
    res.send("Hello from backend")
})

app.use("/api" , require("./routes/users"))
app.use("/api" , require("./routes/products"))
app.use("/api" , require("./routes/carts"))
app.use("/api" , require("./routes/queries"))
app.use("/api" , require("./routes/whatsapps"))
app.use("/api" , require("./routes/address"))
app.listen(port , () => {
    console.log(`Listening to the port ${port}`);
})