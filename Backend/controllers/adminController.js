// Backend/controllers/adminController.js
import Feedback from "../models/Feedback.js";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import User from "../models/user.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalPayments = await Payment.countDocuments();
    const totalFeedbacks = await Feedback.countDocuments();

    const recentBookings = await Booking.find()
      .populate("user", "name email")
      .populate("bike", "name")
      .sort({ createdAt: -1 })
      .limit(6);

    const recentUsers = await User.find()
      .select("name email createdAt")
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      stats: { totalUsers, totalBookings, totalPayments, totalFeedbacks },
      recentBookings,
      recentUsers,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error("Feedbacks error:", err);
    res.status(500).json({ message: "Error fetching feedbacks" });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Payment.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error("Transactions error:", err);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};
