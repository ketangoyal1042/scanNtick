import express from 'express';
import { eventListByEmailController, eventListController, eventRegisterController, getAllEventListController } from '../controller/eventController.js';
import { requireSignIn, verifiedVisitor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/registeration', requireSignIn, eventRegisterController);
router.get('/EventList', requireSignIn, eventListController);
router.get('/GetAllEvents', requireSignIn, getAllEventListController);
router.get('/EventList/:email', verifiedVisitor, eventListByEmailController);

export default router;
