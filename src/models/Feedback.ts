import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    design: { type: mongoose.Schema.Types.ObjectId, ref: "Design", required: true },  // Reference to Design
    feedbacks: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }  // Root level timestamps for the main document
);

// Add timestamps to each feedback subdocument
feedbackSchema.path("feedbacks").schema.set("timestamps", true);

export default mongoose.model("Feedback", feedbackSchema);
