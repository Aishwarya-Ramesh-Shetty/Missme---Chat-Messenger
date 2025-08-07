const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const authRoutes = require('./routes/authRoutes.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth/',authRoutes)


const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb connected")
})
.catch((err)=>console.log(err))


app.get("/",(req,res)=>{
    console.log("Running ")
})

app.listen(PORT,()=>{
    console.log(`Server listening on Port ${PORT}`)
})