import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({ name, email, password: hashedPassword, phone });

    // Generate JWT token after successful registration
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

    // Respond with success message and token
    res.status(201).json({ message: "User registered successfully", user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Compare password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Create a JWT token after successful login
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );;

    // Respond with the token and user data
    res.json({
      message: "Login successful",  // Optional success message
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId; // Extracted from the JWT token by the middleware

    // Find the user and exclude the password from the result
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user profile" });
  }
};

// Update User Profile
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone } = req.body;
    const userId = (req as any).userId; // Extracted from the JWT token by the middleware

    // Validate the new email if provided
    if (email) {
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== userId) {
        res.status(400).json({ message: "Email is already in use by another user" });
        return;
      }
    }

    // Update user information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating profile" });
  }
};

// Delete User Account
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId; // Extracted from the JWT token by the middleware

    // Delete the user account
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user" });
  }
};


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Admin check can be added here, for now, assuming all protected users can access it
    const users = await User.find().select("-password"); // Exclude password field

    res.json(users); // Send back the list of users
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get All Users (admin only)
// export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = req.userId; // The userId from the JWT token
//     const user = await User.findById(userId); // Find the logged-in user

//     // Check if the user is an admin
//     if (!user || !user.isAdmin) {
//       res.status(403).json({ message: "Permission denied" });
//       return;
//     }

//     // Fetch all users if the logged-in user is an admin
//     const users = await User.find().select("-password");
//     res.json(users); // Send back the list of users
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// };
