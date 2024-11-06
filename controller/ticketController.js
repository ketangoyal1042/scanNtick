import QRcode from "qrcode";
import ticketModal from "../models/ticketModal.js";
import QrModal from "../models/QrModal.js";
import { v4 as uuidv4 } from "uuid";

export const ticketGeneratorContoller = async (req, res) => {
  const { mobileNumber, quantity, eventId } = req.body;
  if (
    !mobileNumber ||
    !quantity ||
    typeof quantity !== "number" ||
    quantity <= 0
  ) {
    return res.status(400).json({
      message:
        "Please provide a valid, 'mobileNumber', and a positive integer 'n' (number of QR codes).",
    });
  }
  try {
    const qrCodes = [];
    for (let i = 1; i <= quantity; i++) {
      const codeId = uuidv4();
      const qrCodeUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ticket/scan?codeId=${codeId}`;
      // const qrCodeId = `qr-${mobileNumber}-${i}`;
      const qrCodeDataUrl = await QRcode.toDataURL(qrCodeUrl);
      const qr = new QrModal({
        qrCodeId: codeId,
        qrCode: qrCodeDataUrl,
      });
      qrCodes.push(qr._id);
      await qr.save();
    }

    // Create the ticket
    const ticket = new ticketModal({
      //   userId,
      userId: req.user._id,
      phoneNumber: mobileNumber,
      qrCodes: qrCodes,
      eventId: eventId,
    });
    await ticket.save();
    res.status(200).json({
      message: `${quantity} QR codes generated and ticket created successfully`,
      ticket: {
        id: ticket._id,
        // userId: ticket.userId,
        phoneNumber: ticket.phoneNumber,
        qrCodes: ticket.qrCodes,
        createdAt: ticket.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error accured in generating ticket",
      error,
    });
  }
};

export const scanQrContoller = async (req, res) => {
  const { codeId } = req.query;
  try {
    const qrCode = await QrModal.findOne({ qrCodeId: codeId });
    if (!qrCode) {
      return res.status(404).json({ error: "QR Code not found" });
    }

    // Check if already scanned
    if (qrCode.isScanned) {
      return res.status(400).json({ error: "QR Code already used" });
    }

    // Mark as scanned
    qrCode.isScanned = true;
    qrCode.scannedAt = new Date();
    await qrCode.save();

    res.json({ message: "QR Code successfully scanned!" });
  } catch (error) {
    res.status(500).json({ error: "Error processing QR code" });
  }
  // try {
  //   const { codeId } = req.body;

  //   const qrCode = await QrModal.findOne({ qrCodeId: codeId });

  //   if (!qrCode) {
  //     return res.status(404).json({ error: "QR code not found." });
  //   }

  //   if (qrCode.isScanned) {
  //     return res
  //       .status(400)
  //       .json({ error: "This QR code has already been used." });
  //   }

  //   // Mark QR code as scanned
  //   qrCode.isScanned = true;
  //   qrCode.scannedAt = new Date();
  //   await qrCode.save();

  //   return res.status(200).json({ message: "QR code scanned successfully! Now it would no longer be valid" });
  // } catch (error) {
  //   console.error("Error scanning QR code:", error);
  //   return res.status(500).json({ error: "Server error" });
  // }
};
