// Backend/routes/adminRoutes.js
import express from "express";
import { getDashboardStats, getAllFeedbacks, getAllTransactions } from "../controllers/adminController.js";
import { getAllBookings } from "../controllers/bookingController.js";
import { getAllUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);
router.get("/bookings", getAllBookings);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/feedbacks", getAllFeedbacks);
router.get("/transactions", getAllTransactions);

export default router;
