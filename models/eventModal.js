import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId, // Utlizing User Array to associate event with multiple users
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
