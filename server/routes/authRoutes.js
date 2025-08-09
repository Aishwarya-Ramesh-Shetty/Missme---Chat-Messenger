const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or mobile already in use" });
    }

    // Remove manual hashing here!
    // Just save raw password; the pre-save hook will hash it
    const user = await User.create({
      name,
      email,
      mobile,
      password  // raw password here, will be hashed by pre-save hook
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    let { emailOrMobile, password } = req.body;
    console.log("Request body:", req.body);

    // Trim inputs (important)
    if (typeof emailOrMobile === "string") emailOrMobile = emailOrMobile.trim();
    if (typeof password === "string") password = password.trim();

    console.log("Trimmed emailOrMobile:", emailOrMobile);
    console.log("Trimmed password:", password);

    const user = await User.findOne({
      $or: [
        { email: { $regex: `^${emailOrMobile}$`, $options: "i" } },
        { mobile: emailOrMobile },
      ],
    });

    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("Comparing passwords...");
    const isMatch = await user.matchPassword(password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;
