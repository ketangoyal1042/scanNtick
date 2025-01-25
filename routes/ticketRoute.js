import express from "express";
import {
  scanQrController,
  ticketGeneratorContoller,
} from "../controller/ticketController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";
import { accociateHost } from "../middleware/eventMiddleware.js";

const router = express.Router();

router.post("/generate-ticket", requireSignIn, ticketGeneratorContoller);
router.get("/scan", requireSignIn, accociateHost, scanQrController);

export default router;
