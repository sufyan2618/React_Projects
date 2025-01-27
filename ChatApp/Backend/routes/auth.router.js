const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ error: "Please fill all fields" });
    }
    if(password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      hashedPassword, // Password will be hashed by the pre-save middleware
    });

    if(newUser) {
      generateToken(newUser._id, res);
      newUser.save(); 
      res.status(201).json({id: newUser._id, name: newUser.name, email: newUser.email, profilePicture: newUser.profilePicture});
    }
    else {
      res.status(400).json({ error: "Error during registration. Please try again." });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.render("signup", {
      error: "Error during registration. Please try again.",
    });
  }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ error: "Please fill all fields" });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const passwordCorrect = await bcrypt.compare(password, existingUser.hashedPassword);
        if (!passwordCorrect) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        generateToken(existingUser._id, res);
        res.status(200).json({id: existingUser._id, name: existingUser.name, email: existingUser.email, profilePicture: existingUser.profilePicture});
    } catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ error: "Error during login. Please try again." });
    }
});

router.post("/logout", (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.error("Logout error:", error);
        res.status(400).json({ error: "Error during logout. Please try again." });
    }
}); 
module.exports = router;
