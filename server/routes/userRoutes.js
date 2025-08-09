const express = require("express");
const User = require("../models/User.js");
const auth = require("../middleware/authMiddleware.js");
const router = express.Router();


router.get("/", auth, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});


router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});


router.put("/:id", auth, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
  res.json(updated);
});


router.delete("/:id", auth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
