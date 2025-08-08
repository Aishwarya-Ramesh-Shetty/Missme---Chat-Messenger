const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require('http')
const socketIo = require('socket.io')
const dotenv = require("dotenv")

dotenv.config()

const authRoutes = require('./routes/authRoutes.js')

const app = express()

const server = http.createServer(app)
const io = socketIo(server,{
    cors :{
        origin : "http://localhost:5173",
        methods : ["GET","POST"],
    }
})

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




io.on("connection",(socket)=>{
    console.log("New user connected:",socket.id)
    socket.on("send message",({sender,receiver,message})=>{
        console.log(`Message from ${sender} to ${receiver} : ${message}`)
        io.emit("receive message",{sender,message,receiver})
    })

    socket.on("disconnected",()=>{
        console.log("User disconnected",socket.id)
    })
})

app.get("/",(req,res)=>{
    console.log("Running ")
})

server.listen(PORT,()=>{
    console.log(`Server listening on Port ${PORT}`)
})