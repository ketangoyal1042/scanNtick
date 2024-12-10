import mongoose from "mongoose";
const { Schema } = mongoose;

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
}, { timestamps: true });

export default mongoose.model('OtpVerification', otpSchema);