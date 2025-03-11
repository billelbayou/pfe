import { Response } from "express";
import { prisma } from "../db/prisma";
import { AuthRequest } from "../utils/types";

// ✅ Student creates transcript (Status defaults to PENDING)
export const createTranscript = async (req: AuthRequest, res: Response) => {
  try {
    if (req.role !== "STUDENT") {
      res.status(403).json({
        success: false,
        message: "Only students can create transcripts",
      });
      return;
    }

    const { academicYear, semester, courses } = req.body;

    // Find student by userId
    const student = await prisma.student.findUnique({
      where: { userId: req.userId },
    });
    if (!student) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }

    const transcript = await prisma.transcript.create({
      data: {
        studentId: student.id,
        academicYear,
        semester,
        courses,
        status: "PENDING", // Default status
      },
    });

    res.status(201).json({
      success: true,
      message: "Transcript created successfully",
      transcript,
    });
    return;
  } catch (error) {
    console.error("Error creating transcript:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

// ✅ Admin fetches all transcripts
export const getAllTranscripts = async (req: AuthRequest, res: Response) => {
  try {
    const transcripts = await prisma.transcript.findMany();
    res.json({ success: true, transcripts });
    return;
  } catch (error) {
    console.error("Error fetching transcripts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

// ✅ Student can view their transcript | Admin can view any transcript
export const getTranscriptById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const transcript = await prisma.transcript.findUnique({
      where: { id },
      include: { student: true },
    });

    if (!transcript) {
      res.status(404).json({ success: false, message: "Transcript not found" });
      return;
    }

    // Allow admins or the student owner to access it
    if (req.role !== "ADMIN" && transcript.student.userId !== req.userId) {
      res.status(403).json({ success: false, message: "Forbidden" });
      return;
    }

    res.json({ success: true, transcript });
    return;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

// ✅ Admin approves or rejects transcript
export const updateTranscriptStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      res.status(400).json({ success: false, message: "Invalid status" });
      return;
    }

    const transcript = await prisma.transcript.update({
      where: { id },
      data: { status },
    });

    res.json({
      success: true,
      message: `Transcript ${status.toLowerCase()} successfully`,
      transcript,
    });
    return;
  } catch (error) {
    console.error("Error updating transcript status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
