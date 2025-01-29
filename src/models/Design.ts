import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    description: { type: String },
    feedback: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }
  },
  { timestamps: true }
);

export default mongoose.model("Design", designSchema);
