import express from "express";
import {
  scanQrController,
  ticketGeneratorContoller,
  ticketListController,
} from "../controller/ticketController.js";
import { requireSignIn, requireVisitorSignIn } from "../middleware/authMiddleware.js";
import { accociateHost } from "../middleware/eventMiddleware.js";

const router = express.Router();

router.post("/generate-ticket", requireSignIn, ticketGeneratorContoller);
router.get("/scan", requireSignIn, accociateHost, scanQrController);
router.get("/ticketList", requireVisitorSignIn, ticketListController);

export default router;
