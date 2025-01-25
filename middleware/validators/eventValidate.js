import mongoose from "mongoose";

export const validateEventId = (req, res, next) => {
  const EventId = req.params.id || req.body.eventId;
  if (!EventId) {
    return res.status(400).send({
      success: false,
      message: "Event ID is required",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(EventId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Event ID",
    });
  }
  req.eventId = EventId;
  next();
};
