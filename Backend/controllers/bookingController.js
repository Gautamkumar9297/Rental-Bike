// Backend/controllers/bookingController.js
import Booking from "../models/Booking.js";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("name", " email")
      .populate("purpose", "destination")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Get bookings error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const addBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking created successfully" });
  } catch (err) {
    console.error("Add booking error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Delete booking error:", err);
    res.status(500).json({ message: err.message });
  }
};
