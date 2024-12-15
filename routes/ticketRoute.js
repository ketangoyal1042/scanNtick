import express from "express";
import {
  scanQrContoller,
  ticketGeneratorContoller,
} from "../controller/ticketController.js";
import {requireSignIn } from "../middleware/authMiddleware.js";
import { AccociateHost } from "../middleware/eventMiddleware.js";

const router = express.Router();

router.post("/generate-ticket", requireSignIn, ticketGeneratorContoller);
router.get("/scan", requireSignIn, AccociateHost, scanQrContoller);

export default router;
