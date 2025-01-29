import { Request, Response } from "express";
import Feedback from "../models/Feedback";
import Design from "../models/Design";

// ✅ Submit Feedback for a specific design
export const submitFeedback = async (req: Request, res: Response): Promise<void> => {
  const { designId, userId, rating, comment } = req.body;

  try {
    // Ensure that the design exists
    const design = await Design.findById(designId);
    if (!design) {
      res.status(404).json({ error: "Design not found" });
      return;
    }

    // Create new feedback object
    const newFeedback = {
      user: userId,
      rating,
      comment,
    };

    // Find the feedback document related to this design
    let feedback = await Feedback.findOne({ design: designId });

    if (feedback) {
      // If feedback document already exists, just push the new feedback to the feedbacks array
      feedback.feedbacks.push(newFeedback);
      await feedback.save();
    } else {
      // If feedback document does not exist, create a new one with the first feedback
      feedback = new Feedback({
        design: designId,
        feedbacks: [newFeedback],
      });
      await feedback.save();
    }

    res.status(201).json(feedback); // Return the updated feedback document
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Submitting feedback failed" });
  }
};

// ✅ Get all feedbacks for a specific design
export const getFeedbacks = async (req: Request, res: Response): Promise<void> => {
  const { designId } = req.params;

  try {
    // Fetch feedbacks related to a specific design
    const feedbacks = await Feedback.find({ design: designId })
      .populate({
        path: "feedbacks.user", // Populate the user field inside feedbacks array
        select: "name email", // Select only necessary user fields
      })
      .populate("design"); // Optionally populate the design field if needed

    if (!feedbacks.length) {
      res.status(404).json({ message: "No feedbacks found for this design" });
      return;
    }

    res.json(feedbacks); // Return feedbacks for the specified design
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetching feedbacks failed" });
  }
};
