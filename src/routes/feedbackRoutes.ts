import express from "express";
import { submitFeedback, getFeedbacks, getAllFeedbacks } from "../controllers/feedbackController";

const router = express.Router();

// Submit feedback for a specific design
router.post("/:designId", submitFeedback);

// Get all feedbacks for a specific design
router.get("/:designId", getFeedbacks);
router.get("/", getAllFeedbacks);

export default router;
