import express from "express";
import { protect } from "../middleware/authMiddleware";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser,getAllUsers } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser); // No need for authentication
router.post("/login", loginUser); // No need for authentication

// Protected routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUser);

router.get("/users", protect, getAllUsers);

export default router;
