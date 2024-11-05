import express from 'express';
import { loginContoller, registerController } from '../controller/authController.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginContoller);

export default router;
