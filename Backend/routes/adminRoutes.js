// Backend/routes/adminRoutes.js
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { 
  getDashboardStats, 
  getAllFeedbacks, 
  getAllTransactions 
} from "../controllers/adminController.js";
import { 
  getAllBookings 
} from "../controllers/bookingController.js";
import { 
  getAllUsers, 
  deleteUser 
} from "../controllers/userController.js";

const router = express.Router();

// ✅ Admin Dashboard (Stats)
router.get("/dashboard", verifyToken, getDashboardStats);

// ✅ Bookings Management
router.get("/bookings", verifyToken, getAllBookings);

// ✅ Users Management
router.get("/users", verifyToken, getAllUsers);
router.delete("/users/:id", verifyToken, deleteUser);

// ✅ Feedbacks
router.get("/feedbacks", verifyToken, getAllFeedbacks);

// ✅ Transactions
router.get("/transactions", verifyToken, getAllTransactions);

export default router;
