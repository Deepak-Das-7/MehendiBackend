import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Import Routes
import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import designRoutes from "./routes/designRoutes";
import contactRoutes from "./routes/contactRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import chatRoutes from "./routes/chatRoutes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));



// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/chats", chatRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port:${PORT}`);
});
