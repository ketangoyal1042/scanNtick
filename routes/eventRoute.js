import express from 'express';
import { eventListController, eventRegisterController } from '../controller/eventController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/registeration', requireSignIn, eventRegisterController);
router.get('/EventList',requireSignIn, eventListController);

export default router;
