import express from "express";
import upload from "../middleware/upload.js";
import Registration from "../models/Registration.js";

const router = express.Router();

// POST: Create registration
router.post("/", upload.fields([{ name: "bikePic" }, { name: "aadhar" }]), async (req, res) => {
  try {
    const { name, email, mobile, address, city, regno, policy } = req.body;

    const newRegistration = new Registration({
      name,
      email,
      mobile,
      address,
      city,
      regno,
      policy,
      bikePic: req.files["bikePic"] ? req.files["bikePic"][0].filename : null,
      aadhar: req.files["aadhar"] ? req.files["aadhar"][0].filename : null,
    });

    await newRegistration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving registration" });
  }
});

export default router;
