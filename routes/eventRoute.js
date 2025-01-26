import express from "express";
import {
  addCollaboratorController,
  eventDeleteController,
  eventListByEmailController,
  eventListController,
  eventRegisterController,
  eventUpdateController,
  getActiveEventTitleController,
  getEventbyIdController,
  getsubAdminController,
  removeCollaboratorController,
} from "../controller/eventController.js";
import {
  checkEventAdministrator,
  requireSignIn,
  verifiedVisitor,
} from "../middleware/authMiddleware.js";
import { validateEventId } from "../middleware/validators/eventValidate.js";

const router = express.Router();

//Event
router.post("/registeration", requireSignIn, eventRegisterController);
router.get("/EventList", requireSignIn, eventListController);
router.get(
  "/getActiveEventsTitle",
  requireSignIn,
  getActiveEventTitleController
);

router.delete(
  "/deleteEvent/:id?",
  requireSignIn,
  validateEventId,
  checkEventAdministrator,
  eventDeleteController
);

router.patch(
  "/updateEvent/:id?",
  requireSignIn,
  validateEventId,
  checkEventAdministrator,
  eventUpdateController
);

router.get("/:id?", requireSignIn, validateEventId, getEventbyIdController);

//Collaborator
router.post(
  "/subCollaborator/add",
  requireSignIn,
  validateEventId,
  checkEventAdministrator,
  addCollaboratorController
);

router.put(
  "/subCollaborator/remove",
  requireSignIn,
  validateEventId,
  checkEventAdministrator,
  removeCollaboratorController
);

router.get(
    "/subCollaborator/getList/:id",
    requireSignIn,
    validateEventId,
    checkEventAdministrator,
    getsubAdminController
)

export default router;
