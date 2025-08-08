const express = require("express")
const router = express.Router()
const Message = require("../models/Message.js")


router.get("/history",async(req,res)=>{
    const {sender,receiver} = req.query

    try{
        if(!sender || !receiver){
            return res.status(400).json({message:"Sender and receiver required"})
        }

        const message = await Message.find({
            $or:[
                {sender,receiver},
                {sender:receiver,receiver:sender}
            ]
        }).sort({createdAt : 1})


        res.status(200).json(message)
    }
    catch(error){
        console.error("Error fetching chat history in backend",error)
        res.status(500).json({message:"Server error"})
    }
})

module.exports = router;