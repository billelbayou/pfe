import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AuthRequest } from "../utils/types";
import { Course, Prisma } from "@prisma/client";

type Unite = Prisma.UniteGetPayload<{
  include: { courses: true };
}>;

export const createTranscript = async (req: AuthRequest, res: Response) => {
  const data = req.body; // Updated to include `unites` and `year`
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

  console.log("Here The student details :");
  console.log(student);
  console.log("Here The data details :");
  console.log(data);
  res.status(200).json({ success: true, message: "Transcript created" });
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
      include: { unites: true }, // Include courses in the response
    });
    res.status(200).json(transcripts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transcripts" });
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
