import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// POST - Submit feedback
router.post("/", async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    if (!name || !email || !message || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newFeedback = new Feedback({ name, email, message, rating });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Server error while saving feedback." });
  }
});

// (Optional) GET - List all feedback (for admin dashboard)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Server error while fetching feedback." });
  }
});

export default router;
