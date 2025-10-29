import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  altMobile: String,
  address: { type: String, required: true },
  pickup: { type: String, required: true },
  destination: { type: String, required: true },
  purpose: { type: String, required: true },
  aadhar: { type: String }, // path or filename
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
