import express from 'express';
import { eventDeleteController, eventListByEmailController, eventListController, eventRegisterController, getActiveEventTitleController } from '../controller/eventController.js';
import { requireSignIn, verifiedVisitor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/registeration', requireSignIn, eventRegisterController);
router.get('/EventList/:id?', requireSignIn, eventListController);
// router.get('/EventList/:email', verifiedVisitor, eventListByEmailController);
router.get('/getActiveEvents', requireSignIn, getActiveEventTitleController);
router.delete('/deleteEvent/:id?', requireSignIn, eventDeleteController);

export default router;
