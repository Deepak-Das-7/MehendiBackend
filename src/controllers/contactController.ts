import { Request, Response } from "express";
import Contact from "../models/Contact";

export const submitQuery = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Submitting query failed" });
  }
};

export const getQueries = async (_req: Request, res: Response) => {
  try {
    const queries = await Contact.find();
    res.json(queries);
  } catch (error) {
    res.status(500).json({ error: "Fetching queries failed" });
  }
};
