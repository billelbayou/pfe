import express from "express";
import {
  createTranscript,
  getAllTranscripts,
  getTranscriptById,
  updateTranscriptStatus,
} from "../controllers/transcript.controller";
import { verifyToken } from "../middleware/verifyToken";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/", verifyToken, roleMiddleware(["STUDENT"]), createTranscript);
router.get("/", verifyToken, roleMiddleware(["ADMIN"]), getAllTranscripts);
router.get("/:id", verifyToken, getTranscriptById);
router.put(
  "/:id/status",
  verifyToken,
  roleMiddleware(["ADMIN"]),
  updateTranscriptStatus
);

export default router;
