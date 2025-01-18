import express from 'express';
import { eventDeleteController, eventListByEmailController, eventListController, eventRegisterController, eventUpdateController, getActiveEventTitleController, getEventbyIdController } from '../controller/eventController.js';
import { checkEventAdministrator, requireSignIn, verifiedVisitor } from '../middleware/authMiddleware.js';
import { validateEventId } from '../middleware/validators/eventValidate.js';

const router = express.Router();

router.post('/registeration', requireSignIn, eventRegisterController);
router.get('/EventList', requireSignIn, eventListController);
router.get('/getActiveEventsTitle', requireSignIn, getActiveEventTitleController);
// router.get('/EventList/:email', verifiedVisitor, eventListByEmailController);
router.delete('/deleteEvent/:id?', requireSignIn, validateEventId, checkEventAdministrator, eventDeleteController);
router.patch('/updateEvent/:id?', requireSignIn, validateEventId, checkEventAdministrator, eventUpdateController);
router.get('/:id?', requireSignIn, validateEventId, getEventbyIdController);

export default router;
