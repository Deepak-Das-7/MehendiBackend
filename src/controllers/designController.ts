import { Request, Response } from "express";
import Design from "../models/Mehendi";
import mongoose from "mongoose";

export const addDesign = (req: Request, res: Response) => { // Removed 'async'
  Design.create(req.body)
    .then((design) => res.status(201).json(design))
    .catch((error) => res.status(500).json({ error: "Adding design failed" }));
};

export const getDesigns = (_req: Request, res: Response) => { // Removed 'async'
  Design.find()
    .then((designs) => res.json(designs))
    .catch((error) => res.status(500).json({ error: "Fetching designs failed" }));
};

export const getDesignById = (req: Request, res: Response) => { // Removed 'async'
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid design ID format" }); // Return directly
  }

  Design.findById(id)
    .then((design) => {
      if (!design) {
        return res.status(404).json({ error: "Design not found" }); // Return directly
      }
      res.json(design);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error fetching design" });
    });
};