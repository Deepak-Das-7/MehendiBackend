import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    // Type the decoded token to ensure it has userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };

    // Attach the userId to the request object
    (req as any).userId = decoded._id; 

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
