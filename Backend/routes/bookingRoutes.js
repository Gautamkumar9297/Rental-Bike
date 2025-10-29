import express from "express";
import upload from "../middleware/upload.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ POST — Create a Booking
router.post("/", upload.single("aadhar"), async (req, res) => {
  try {
    const { name, email, mobile, altMobile, address, pickup, destination, purpose } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !address || !pickup || !destination || !purpose) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newBooking = new Booking({
      name,
      email,
      mobile,
      altMobile,
      address,
      pickup,
      destination,
      purpose,
      aadhar: req.file ? req.file.filename : null, // Save filename from upload
    });

    await newBooking.save();
    res.status(201).json({ message: "✅ Booking saved successfully!", booking: newBooking });
  } catch (err) {
    console.error("Error while saving booking:", err);
    res.status(500).json({ message: "❌ Error saving booking" });
  }
});

// ✅ GET — Fetch All Bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "❌ Error fetching bookings" });
  }
});

export default router;
