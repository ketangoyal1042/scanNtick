import { comparePassword, hashedPassword } from "../helper/authHelper.js";
import userModal from "../models/userModal.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    const existinguser = await userModal.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "User already Exists with Us",
      });
    }
    const hashePassword = await hashedPassword(password);
    const user = await new userModal({
      name,
      email,
      phone,
      password: hashePassword,
    }).save();

    res
      .status(200)
      .send({ success: true, message: "User Registered successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Resgisteration",
      error,
    });
  }
};

export const loginContoller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User does not exist",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Credentials, Plesase try again",
      });
    }
    //token creation
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
