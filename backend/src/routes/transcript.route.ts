import express from "express";
import {
  createTranscript,
  getAllTranscripts,
  getStudentTranscripts,
  getTranscriptById,
} from "../controllers/transcript.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// Create a new transcript
router.post("/student", verifyToken, createTranscript);

router.get("/", verifyToken, getAllTranscripts);

router.get("/transcript/:id", verifyToken, getTranscriptById);

router.get("/student", verifyToken, getStudentTranscripts);

export default router;
