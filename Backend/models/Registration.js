import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  address: String,
  city: String,
  regno: String,
  policy: String,
  bikePic: String,
  aadhar: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Registration", registrationSchema);
