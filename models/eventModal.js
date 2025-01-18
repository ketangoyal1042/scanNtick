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
    headCapacity: {
      type: Number,
      required: true,
    },
    eventDateTime: {
      type: Date,
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

eventSchema.statics.isUserAdministrator = async function (eventId, userId) {
  const event = await this.findOne({
    _id: eventId,
    userId: userId,
  });
  return !!event;
};

export default mongoose.model("Event", eventSchema);
