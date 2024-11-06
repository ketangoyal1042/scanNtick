import eventModal from "../models/eventModal.js";

export const eventRegisterController = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;
  try {
    if (!title) {
      return res.send({ message: "Title is required" });
    }
    if (!description) {
      return res.send({ message: "Description is required" });
    }
    if (userId && userId.length === 0) {
      return res.status(500).send({
        success: false,
        message: "Atlease one admin assoicativity is required",
      });
    }
    const event = await new eventModal({
      title,
      description,
      userId,
    }).save();

    res
      .status(200)
      .send({ success: true, message: "Event Created successfully", event });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const eventListController = async (req, res) => {
  const userId = req.user._id;
  const events = await eventModal.find({ userId }).select("-userId");
  res.status(200).send({
    success: true,
    events,
  });
};
