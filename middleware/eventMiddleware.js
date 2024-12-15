import eventModal from "../models/eventModal.js";

export const AccociateHost = async (req, res, next) => {
  try {
    const { eventId } = req.query;
    const hosts = await eventModal.findById(eventId).select('userId');
    if (hosts) {
      const user = hosts.userId.includes(req.user._id);
      if (user) {
        next();
      }
      else {
        res.status(401).send({ success: false, message: "You does not have Access to Scan!" });
      }
    }
    console.log("host", hosts);

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Encounter Error while in Verification",
      error,
    });
  }
}