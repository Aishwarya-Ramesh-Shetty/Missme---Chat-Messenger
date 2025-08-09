const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require('http')
const socketIo = require('socket.io')
const dotenv = require("dotenv")
const Message = require("./models/Message.js")
const chatRoutes = require('./routes/chatRoutes.js')
const uploadRoute = require('./routes/uploadRoute.js')

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
app.use('/api/chat/',chatRoutes)
app.use('/api',uploadRoute)
app.use('/uploads',express.static('uploads'))


const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb connected")
})
.catch((err)=>console.log(err))




io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("send message", async ({ sender, receiver, message, fileUrl }) => {
    if (!receiver) return; 

    try {
      const newMessage = new Message({ sender, receiver, message, fileUrl });
      await newMessage.save();

      io.emit("receive message", { sender, receiver, message, fileUrl });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});


app.get("/",(req,res)=>{
    console.log("Running ")
})

app.get("/messages", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});


server.listen(PORT,()=>{
    console.log(`Server listening on Port ${PORT}`)
})