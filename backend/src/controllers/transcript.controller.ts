import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AuthRequest } from "../utils/types";
import { Course } from "@prisma/client";

export const createTranscript = async (req: AuthRequest, res: Response) => {
  const { courses, semester } = req.body;
  const { userId, role } = req;

  // Ensure the user is a student
  if (role !== "STUDENT") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Only students can create transcripts",
    });
  }

  // Ensure userId is defined
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User ID not found",
    });
  }

  try {
    // Find the student associated with the user
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Calculate the average and total credits
    let totalCredits = 0;
    let totalWeightedGrades = 0;
    let totalCoefficients = 0;

    const transcriptCourses = courses.map((course: Course) => {
      const { exam, td, tp, coefficient, credits, courseName } = course;

      // Calculate the course average (example: exam * 0.6 + td * 0.2 + tp * 0.2)
      const courseAverage = exam * 0.6 + td * 0.2 + tp * 0.2;

      // Update total coefficients and weighted grades
      totalCoefficients += coefficient;
      totalWeightedGrades += courseAverage * coefficient;

      return {
        courseName,
        exam,
        td,
        tp,
        coefficient,
        credits,
      };
    });

    // Calculate the overall average
    const overallAverage = totalWeightedGrades / totalCoefficients;

    // Calculate total credits based on the overall average
    if (overallAverage >= 10) {
      totalCredits = 30; // Automatic 30 credits if average >= 10
    } else {
      // Sum credits of courses where the student passed (course average >= 10)
      totalCredits = courses.reduce((sum: number, course: Course) => {
        const courseAverage =
          course.exam * 0.6 + course.td * 0.2 + course.tp * 0.2;
        return courseAverage >= 10 ? sum + course.credits : sum;
      }, 0);
    }

    // Create the transcript
    const transcript = await prisma.transcript.create({
      data: {
        studentId: student.id,
        semester, // Add the semester
        average: overallAverage, // Add the calculated average
        credits: totalCredits, // Add the total credits
        status: "PENDING", // Default status
        courses: {
          create: transcriptCourses, // Add the courses
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
