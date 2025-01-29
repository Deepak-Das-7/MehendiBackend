import { Request, Response } from "express";
import Booking from "../models/Booking";

export const bookSlot = async (req: Request, res: Response) => {
  try {
    const { user, date, timeSlot, design } = req.body;
    const booking = await Booking.create({ user, date, timeSlot, design });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Booking failed" });
  }
};

export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().populate("customer").populate("designId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Fetching bookings failed" });
  }
};
