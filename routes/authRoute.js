import express from 'express';
import { loginContoller, registerController, sendOtpContoller, verifyOtpContoller } from '../controller/authController.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginContoller);
router.post('/send-otp', sendOtpContoller);
router.post('/verify-otp', verifyOtpContoller);

export default router;
