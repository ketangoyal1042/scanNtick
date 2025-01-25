import QRcode from "qrcode";
import ticketModal from "../models/ticketModal.js";
import QrModal from "../models/QrModal.js";
import { v4 as uuidv4 } from "uuid";
import { mailTransporter } from "../helper/authHelper.js";

export const ticketGeneratorContoller = async (req, res) => {
  const { mobileNumber, email, quantity, eventId } = req.body;
  if (
    !mobileNumber ||
    !email ||
    !quantity ||
    typeof quantity !== "number" ||
    quantity <= 0
  ) {
    return res.status(400).json({
      message:
        "Please provide a valid, 'mobileNumber', 'email', and a positive integer 'n' (number of QR codes).",
    });
  }
  try {
    const qrCodes = [];
    for (let i = 1; i <= quantity; i++) {
      const codeId = uuidv4();
      const qrCodeUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ticket/scan?codeId=${codeId}&eventId=${eventId}`;
      const qrCodeDataUrl = await QRcode.toDataURL(qrCodeUrl);
      const qr = new QrModal({
        qrCodeId: codeId,
        qrCode: qrCodeDataUrl,
        eventId: eventId,
      });
      qrCodes.push(qr._id);
      await qr.save();
    }

    // Create the ticket
    const ticket = new ticketModal({
      // associateId: [req.user._id],
      phoneNumber: mobileNumber,
      email: email,
      qrCodes: qrCodes,
      eventId: eventId,
    });
    await ticket.save();
    res.status(200).json({
      message: `${quantity} QR codes generated and ticket created successfully`,
      ticket: {
        id: ticket._id,
        phoneNumber: ticket.phoneNumber,
        email: ticket.email,
        eventId: ticket.eventId,
        qrCodes: ticket.qrCodes,
        createdAt: ticket.createdAt,
      },
    });
    const transporter = mailTransporter();
    const mailOptions = {
      from: 'kushagragoyal1032@gmail.com',
      to: email,
      subject: 'Congratulations!! your ticket is created successfully.',
      text: `Ticket is created successfully!! \n Ticket ID: ${ticket.id}`,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).json({ error: 'Failed to send OTP.' });
      res.json({ message: 'OTP sent successfully.' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while generating ticket",
      error,
    });
  }
};

export const scanQrController = async (req, res) => {
  const { codeId, eventId } = req.query;

  try {
    // Validate request parameters
    if (!codeId || !eventId) {
      return res.status(400).json({ success: false, message: "Code ID and Event ID are required" });
    }

    // Find QR Code
    const qrCode = await QrModal.findOne({ qrCodeId: codeId });
    if (!qrCode) {
      return res.status(404).json({ success: false, message: "QR Ticket does not exist" });
    }
    // Check if already scanned
    if (qrCode.isScanned) {
      return res.status(200).json({ success: false, message: "QR Code already used" });
    }
    // Mark as scanned
    qrCode.isScanned = true;
    qrCode.scannedAt = new Date();
    await qrCode.save();

    // Respond with success
    return res.status(200).json({ success: true, message: "QR Code successfully scanned!" });
  } catch (error) {
    console.error("Error in scanQrController:", error);
    return res.status(500).json({ success: false, message: "Error processing QR code" });
  }
};
