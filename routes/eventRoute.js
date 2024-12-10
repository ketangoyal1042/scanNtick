import express from 'express';
import { eventListByNumberController, eventListController, eventRegisterController } from '../controller/eventController.js';
import { requireSignIn, verifiedVisitor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/registeration', requireSignIn, eventRegisterController);
router.get('/EventList', requireSignIn, eventListController);
router.get('/EventList/:email', verifiedVisitor, eventListByNumberController);

export default router;
