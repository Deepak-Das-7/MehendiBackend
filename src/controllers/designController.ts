import { Request, Response } from "express";
import Design from "../models/Design";
import mongoose from "mongoose";
import Feedback from "../models/Feedback";

// ✅ Add a new Design
export const addDesign = async (req: Request, res: Response) => {
  try {
    // Step 1: Create the design first
    const design = await Design.create(req.body);

    // Step 2: Create the feedback object after the design is created
    const feedback = await Feedback.create({
      design: design._id, // Reference to the newly created design
      feedbacks: [] // Start with an empty feedback array
    });

    // Step 3: Update the design to associate the feedback
    design.feedback = feedback._id;
    await design.save();

    res.status(201).json(design);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Adding design failed" });
  }
};

// ✅ Get all Designs
export const getDesigns = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all designs with populated feedbacks, users in feedbacks, and design details
    const designs = await Design.find()
      .populate({
        path: "feedback", // Populate the feedback field
        populate: {
          path: "feedbacks.user", // Populate the user field inside feedbacks array
          select: "name email phone", // Select the user fields to populate
        },
      })

    // If no designs found, return a message
    if (designs.length === 0) {
      res.status(404).json({ message: "No designs found" });
      return;
    }

    res.json(designs); // Return the populated designs with full details
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetching designs failed" });
  }
};


// ✅ Get a Design by its ID

// ✅ Get Design by ID with Full Details (Including Feedbacks and Users)
export const getDesignById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validate the design ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid design ID format" });
    return;
  }

  try {
    // Fetch the design by ID and populate the feedbacks, users in feedbacks
    const design = await Design.findById(id)
      .populate({
        path: "feedback", // Populate the feedback field
        populate: {
          path: "feedbacks.user", // Populate the user field inside feedbacks array
          select: "name email phone", // Select the user fields to populate
        },
      })

    if (!design) {
      res.status(404).json({ error: "Design not found" });
      return;
    }

    res.json(design); // Return the populated design with all details
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetching design failed" });
  }
};


// ✅ Update a Design by its ID
export const updateDesign = (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate the design ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid design ID format" }); // If invalid ID, return error
  }

  Design.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedDesign) => {
      if (!updatedDesign) {
        return res.status(404).json({ error: "Design not found" }); // If not found, return error
      }
      res.json(updatedDesign); // If updated, return updated design
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error updating design" }); // Handle other errors
    });
};

// ✅ Delete a Design by its ID
export const deleteDesign = (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate the design ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid design ID format" }); // If invalid ID, return error
  }

  Design.findByIdAndDelete(id)
    .then((deletedDesign) => {
      if (!deletedDesign) {
        return res.status(404).json({ error: "Design not found" }); // If not found, return error
      }
      res.status(200).json({ message: "Design deleted successfully" }); // Return success message
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error deleting design" }); // Handle other errors
    });
};
