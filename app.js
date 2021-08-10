const { urlencoded } = require("body-parser")
const express = require("express")
const app = express()
const path = require("path")
const morgan = require("morgan")
const dotenv = require("dotenv")
const connectDB = require("./server/database/connection")

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true})) //this is for posting data ~its a middleware accepts form data
app.use(morgan('tiny'))
//or  app.use(morgan('dev'))
connectDB()

app.use("/css",express.static(path.resolve(__dirname,"assets/css")))
app.use("/js",express.static(path.resolve(__dirname,"assets/js")))
app.use("/img",express.static(path.resolve(__dirname,"assets/img")))
app.use("/webfonts",express.static(path.resolve(__dirname,"assets/webfonts")))
//or app.use(express.static("assets"))

app.use("/blogs",require("./server/routes/index"))

app.listen(PORT,()=>{
    console.log(`server listening on localhost:${PORT}`);
})