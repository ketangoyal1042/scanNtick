import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
//   ticketId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Ticket",
//     required: true,
//   },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  qrCodeId: {
    type: String,
    unique: true,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
  isScanned: {
    type: Boolean,
    default: false,
  },
  scannedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("QrCode", qrCodeSchema);
