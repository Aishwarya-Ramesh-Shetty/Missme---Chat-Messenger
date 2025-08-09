const express = require("express");
const Message = require("../models/Message");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/history", auth, async (req, res) => {
  const { sender, receiver } = req.query;

  if (!sender || !receiver) {
    return res.status(400).json({ message: "Sender and receiver are required" });
  }

  const chats = await Message.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender }
    ]
  }).sort({ createdAt: 1 });

  res.json(chats);
});

module.exports = router;
