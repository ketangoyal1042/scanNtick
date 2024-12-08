import express from 'express';
import { eventListByNumberController, eventListController, eventRegisterController } from '../controller/eventController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/registeration', requireSignIn, eventRegisterController);
router.get('/EventList', requireSignIn, eventListController);
router.get('/EventList/:email', eventListByNumberController);

export default router;
