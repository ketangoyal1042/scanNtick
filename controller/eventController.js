import mongoose from "mongoose";
import eventModal from "../models/eventModal.js";
import ticketModal from "../models/ticketModal.js";

export const eventRegisterController = async (req, res) => {
  const { title, description, headCapacity, eventDateTime } = req.body;
  const userId = req.user._id;
  try {
    if (!title) {
      return res.send({ message: "Title is required" });
    }
    if (!description) {
      return res.send({ message: "Description is required" });
    }
    if (!headCapacity) {
      return res.send({ message: "HeadCapacity is required" });
    }
    if (!eventDateTime) {
      return res.send({ message: "eventDateTime is required" });
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
      headCapacity,
      eventDateTime: new Date(eventDateTime),
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
  const limit = req.query.limit;
  const event_type = req.query.event_type;
  let query = { userId };
  if (event_type === "past") {
    query.eventDateTime = { $lt: new Date() };
  } else if (event_type === "upcoming") {
    query.eventDateTime = { $gte: new Date() };
  }

  // Execute the query
  let events = eventModal.find(query).select("-userId");
  if (limit > 0) {
    events = events.limit(limit);
  }

  // Fetch the events
  const result = await events;
  res.status(200).send({
    success: true,
    events: result,
  });
};

export const getEventbyIdController = async (req, res) => {
  try {
    const eventId = req.params.id;
    if (!eventId) {
      return res.status(400).send({
        success: false,
        message: "Event ID is required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID format",
      });
    }
    const result = await eventModal.findById(eventId).select("-userId");
    if(!result){
      return res.status(404).send({
        success: false,
        message: "Event Not Exist with ID " + eventId,
      });
    }
    res.status(200).send({
      success: true,
      event: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching event",
      error,
    });
  }
};

export const eventListByEmailController = async (req, res) => {
  try {
    const { email } = req.visitor;
    const eventList = await ticketModal
      .find({ email: email })
      .populate("eventId");
    res.status(200).send({
      success: true,
      eventList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching events",
      error,
    });
  }
};

export const getActiveEventTitleController = async (req, res) => {
  try {
    const userId = req.user._id;
    const events = await eventModal
      .find({ userId, eventDateTime: { $gt: new Date() } })
      .select("_id, title");
    res.status(200).send({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching events",
      error,
    });
  }
};

export const eventDeleteController = async (req, res) => {
  try {
    const EventId = req.params?.id;

    if (!EventId) {
      return res.status(400).send({
        success: false,
        message: "Event ID is required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID format",
      });
    }
    const event = await eventModal.findByIdAndDelete(EventId);
    if (!event) {
      return res.status(404).send({
        success: false,
        message: "Event Not Found with ID " + EventId,
      });
    }
    res.status(200).send({
      success: true,
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while Delete events",
      error: error.message,
    });
  }
};

export const eventUpdateController = async (req, res) => {
  try {
    const { id, title, description, headCapacity, eventDateTime } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }
    const event = await eventModal.findByIdAndUpdate(
      id,
      {
        title,
        description,
        userId,
        headCapacity,
        eventDateTime: new Date(eventDateTime),
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: `Event not found with ID ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating the event",
      error,
    });
  }
};
