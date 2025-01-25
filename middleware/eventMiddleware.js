import eventModal from "../models/eventModal.js";

// Helper function to check if the event exists
const checkEventExistence = async (eventId) => {
  const event = await eventModal.findById(eventId);
  return event;
};

// Helper function to check if the user is a host for the event
const checkUserIsHost = (event, userId) => {
  return event.userId.includes(userId) || event.subAdmins.includes(userId);
};

export const accociateHost = async (req, res, next) => {
  try {
    const { eventId } = req.query;
    const event = await checkEventExistence(eventId);
    if (!event) {
      return res.status(200).send({ success: false, message: "Event not found!" });
    }

    const isHost = checkUserIsHost(event, req.user._id);
    if (isHost) {
      next();
    } else {
      // User is not a host, return an error message
      res.status(200).send({ success: false, message: "Use does not have Access to scan QR!" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Encountered an error during verification.",
      error,
    });
  }
};
