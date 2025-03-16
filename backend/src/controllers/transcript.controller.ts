import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AuthRequest } from "../utils/types";

export const createTranscript = async (req: AuthRequest, res: Response) => {
  const { courses } = req.body;
  const { userId, role } = req; // userId is from the User table

  // Ensure the user is a student
  if (role !== "STUDENT") {
    res.status(403).json({
      success: false,
      message: "Forbidden: Only students can create transcripts",
    });
    return;
  }

  // Ensure userId is defined
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: User ID not found",
    });
    return;
  }

  try {
    // Find the student associated with the user
    const student = await prisma.student.findUnique({
      where: { userId }, // Find the student by userId (foreign key to User table)
    });

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found for the given user",
      });
      return;
    }

    // Create the transcript using the student's ID (from the Student table)
    const transcript = await prisma.transcript.create({
      data: {
        studentId: student.id, // Use the student's ID, not the user's ID
        courses: {
          create: courses, // Array of courses
        },
      },
      include: {
        courses: true, // Include courses in the response
      },
    });

    res.status(201).json({ success: true, data: transcript });
  } catch (error) {
    console.error("Error creating transcript:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create transcript",
    });
  }
};
export const getAllTranscripts = async (req: AuthRequest, res: Response) => {
  const { userId } = req;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: User ID not found",
    });
    return;
  }
  const student = await prisma.student.findUnique({
    where: { userId }, // Find the student by userId (foreign key to User table)
  });

  if (!student) {
    res.status(404).json({
      success: false,
      message: "Student not found for the given user",
    });
    return;
  }

  try {
    const transcripts = await prisma.transcript.findMany({
      where: { studentId: student.id },
      include: { courses: true }, // Include courses in the response
    });
    res.status(200).json(transcripts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transcripts" });
  }
};

export const getTranscriptById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transcript = await prisma.transcript.findUnique({
      where: { id },
      include: { courses: true }, // Include courses in the response
    });
    if (!transcript) {
      res.status(404).json({ error: "Transcript not found" });
      return;
    }
    res.status(200).json(transcript);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transcript" });
  }
};

export const updateTranscript = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { studentId, courses } = req.body;

  try {
    // First, delete existing courses for the transcript
    await prisma.course.deleteMany({
      where: { transcriptId: id },
    });

    // Then, update the transcript and create new courses
    const updatedTranscript = await prisma.transcript.update({
      where: { id },
      data: {
        studentId,
        courses: {
          create: courses, // Array of new courses
        },
      },
      include: {
        courses: true, // Include courses in the response
      },
    });
    res.status(200).json(updatedTranscript);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update transcript" });
  }
};

export const deleteTranscript = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Delete the transcript and its associated courses
    await prisma.transcript.delete({
      where: { id },
    });
    res.status(204).send(); // No content to send back
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete transcript" });
  }
};
