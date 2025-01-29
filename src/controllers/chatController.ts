import { Request, Response } from "express";
import Chat from "../models/Chat";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const chat = await Chat.create(req.body);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Sending message failed" });
  }
};

export const getChats = async (_req: Request, res: Response) => {
  try {
    const chats = await Chat.find().populate("sender").populate("receiver");
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Fetching chats failed" });
  }
};
