import { comparePassword, hashedPassword, mailTransporter } from "../helper/authHelper.js";
import userModal from "../models/userModal.js";
import JWT from "jsonwebtoken";
import bcrypt from 'bcrypt';
import otpModal from "../models/otpModal.js";


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

// Admin/Collaborator Login
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

// Nodemailer transporter
const transporter = mailTransporter();

export const sendOtpContoller = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    await new otpModal({
      email,
      otp: hashedOtp,
      expiresAt
    }).save();

    const mailOptions = {
      from: 'kushagragoyal1032@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).json({ error: 'Failed to send OTP.' });
      res.json({ message: 'OTP sent successfully.' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Database error.' });
  }

};

export const verifyOtpContoller = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) return res.status(200).json({
      success: false,
      error: 'Email and OTP are required.'
    });

    const otpRecord = await otpModal.findOne({ email });
    if (!otpRecord) return res.status(200).json({
      success: false,
      error: 'Invalid or expired OTP.'
    });

    const isMatch = await bcrypt.compare(otp, otpRecord.otp);
    if (!isMatch) return res.status(200).json({
      success: false,
      error: 'Invalid OTP.'
    });

    // Check expiration
    if (new Date(otpRecord.expiresAt) < new Date()) {
      return res.status(200).json({
        success: false,
        error: 'OTP expired.'
      });
    }

    // Clean up OTP
    await otpModal.deleteOne({ email });
    // create token
    const token = JWT.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      success: true,
      message: 'Otp verified successfully',
      verified: true,
      user: {
        email: email,
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Database error.' });
  }
}


