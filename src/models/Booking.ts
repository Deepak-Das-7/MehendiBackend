import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Customer name
    bookingDate: { type: Date, required: true }, // Booking date (Date type for easier manipulation)
    bookingTime: { type: String, required: true }, // Booking time (String for specific time format)
    designId: { type: mongoose.Schema.Types.ObjectId, ref: "Design", required: true }, // Reference to Design model
    status: { type: String, enum: ["Pending", "Confirmed", "Completed", "Cancelled"], default: "Pending" } // Booking status
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
