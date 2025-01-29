import express from "express";
import { submitFeedback, getFeedbacks } from "../controllers/feedbackController";

const router = express.Router();

// Submit feedback for a specific design
router.post("/:designId", submitFeedback);

// Get all feedbacks for a specific design
router.get("/:designId", getFeedbacks);

export default router;
