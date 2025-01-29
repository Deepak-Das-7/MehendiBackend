import { Request, Response } from "express";
import Feedback from "../models/Feedback";

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: "Submitting feedback failed" });
  }
};

export const getFeedbacks = async (_req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.find().populate("user");
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: "Fetching feedbacks failed" });
  }
};
