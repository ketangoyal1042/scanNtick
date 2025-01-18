import express from 'express';
import { eventDeleteController, eventListByEmailController, eventListController, eventRegisterController, eventUpdateController, getActiveEventTitleController, getEventbyIdController } from '../controller/eventController.js';
import { requireSignIn, verifiedVisitor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/registeration', requireSignIn, eventRegisterController);
router.get('/EventList', requireSignIn, eventListController);
router.get('/:id?', requireSignIn, getEventbyIdController);
// router.get('/EventList/:email', verifiedVisitor, eventListByEmailController);
router.get('/getActiveEventsTitle', requireSignIn, getActiveEventTitleController);
router.delete('/deleteEvent/:id?', requireSignIn, eventDeleteController);
router.patch('/updateEvent', requireSignIn, eventUpdateController);

export default router;
