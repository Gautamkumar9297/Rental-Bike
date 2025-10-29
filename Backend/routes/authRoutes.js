import express from "express";
import User from "../models/user.js"; // ✅ fixed import
import jwt from "jsonwebtoken";
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ message: "User already exists" });

    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    res.json({ message: "Error registering user", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    if (user.password !== password) {
      return res.json({ message: "Invalid password" });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.json({ message: "Error during login", error });
  }
});

export default router;
