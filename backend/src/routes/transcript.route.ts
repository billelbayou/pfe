import express from "express";
import { prisma } from "../db/prisma";
import {
  createTranscript,
  deleteTranscript,
  getAllTranscripts,
  getTranscriptById,
  updateTranscript,
} from "../controllers/transcript.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// Create a new transcript
router.post("/", verifyToken, createTranscript);

// Get all transcripts for a student
router.get("/student", verifyToken, getAllTranscripts);

// Get a single transcript by ID
router.get("/:id", getTranscriptById);

// Update a transcript
router.put("/:id", updateTranscript);

// Delete a transcript
router.delete("/:id", deleteTranscript);

export default router;
