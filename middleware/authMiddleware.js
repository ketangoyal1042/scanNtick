import JWT from "jsonwebtoken";
import eventModal from "../models/eventModal.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Encounter Error while in Authorization",
      error,
    });
  }
};

export const requireVisitorSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.visitor = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Encounter Error while in Authorization",
      error,
    });
  }
};

export const checkEventAdministrator = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const isAdmin = await eventModal.isUserAdministrator(req.eventId, id);
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Encounter Error while in Authorization Role",
      error,
    });
  }
};

export const verifiedVisitor = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.visitor = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Encounter Error while in Verification",
      error,
    });
  }
};
