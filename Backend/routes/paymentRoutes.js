import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Payment from "../models/Payment.js";
import verifyToken from "../middleware/verifyToken.js"; // ✅ Correct import (no curly braces)

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 💰 Create PaymentIntent and save to DB
router.post("/", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id; // comes from token

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // 🪙 Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // ₹ to paise
      currency: "inr",
      payment_method_types: ["card"],
    });

    // 💾 Save payment to MongoDB
    const payment = new Payment({
      user: userId,
      amount,
      status: "Pending",
      paymentIntentId: paymentIntent.id,
    });

    await payment.save();

    // ✅ Send clientSecret to frontend
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({
      message: "Payment initialization failed",
      error: error.message,
    });
  }
});

// ✅ Update payment after successful confirmation
router.post("/success", async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const payment = await Payment.findOne({ paymentIntentId });
    if (payment) {
      payment.status = "Completed";
      await payment.save();
    }

    res.json({ message: "Payment recorded successfully" });
  } catch (err) {
    console.error("Payment update error:", err);
    res.status(500).json({ message: "Error updating payment" });
  }
});

export default router;
