import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AuthRequest } from "../utils/types";
import { Course, Prisma } from "@prisma/client";

type Unite = Prisma.UniteGetPayload<{
  include: { courses: true };
}>;

export const createTranscript = async (req: AuthRequest, res: Response) => {
  const { unites, semester, year } = req.body; // Updated to include `unites` and `year`
  const { userId, role } = req;

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
      where: { userId },
    });

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });
      return;
    }

    // Calculate the overall average and total credits
    let totalCredits = 0;
    let totalWeightedGrades = 0;
    let totalCoefficients = 0;

    const transcriptUnites = await Promise.all(
      unites.map(async (unite: Unite) => {
        const { name, title, coef, credit, courses } = unite;

        // Calculate the unit average and credits
        let uniteWeightedGrades = 0;
        let uniteCoefficients = 0;
        let uniteCredits = 0;

        const uniteCourses = courses.map((course: Course) => {
          const { courseName, exam, td, tp, coefficient, credits } = course;

          // Calculate the course average (example: exam * 0.6 + td * 0.2 + tp * 0.2)
          const courseAverage = exam * 0.6 + td * 0.2 + tp * 0.2;

          // Update unit-level weighted grades and coefficients
          uniteWeightedGrades += courseAverage * coefficient;
          uniteCoefficients += coefficient;

          return {
            courseName,
            exam,
            td,
            tp,
            coefficient,
            credits,
            moy: courseAverage, // Add the calculated average
          };
        });

        // Calculate the unit average
        const uniteAverage = uniteWeightedGrades / uniteCoefficients;

        // Update overall weighted grades and coefficients
        totalWeightedGrades += uniteAverage * coef;
        totalCoefficients += coef;

        // Calculate unit credits based on the unit average
        if (uniteAverage >= 10) {
          uniteCredits = credit; // Full credits if unit average >= 10
        } else {
          // Sum credits of courses where the student passed (course average >= 10)
          uniteCredits = courses.reduce((sum: number, course: Course) => {
            const courseAverage =
              course.exam * 0.6 + course.td * 0.2 + course.tp * 0.2;
            return courseAverage >= 10 ? sum + course.credits : sum;
          }, 0);
        }

        totalCredits += uniteCredits;

        return {
          name,
          title,
          coef,
          credit: uniteCredits,
          moy: uniteAverage,
          courses: {
            create: uniteCourses,
          },
        };
      })
    );

    // Calculate the overall average
    const overallAverage = totalWeightedGrades / totalCoefficients;

    // Create the transcript
    const transcript = await prisma.transcript.create({
      data: {
        studentId: student.id,
        semester,
        year, // Add the year
        average: overallAverage,
        credits: totalCredits,
        status: "PENDING",
        unites: {
          create: transcriptUnites,
        },
      },
      include: {
        unites: {
          include: {
            courses: true,
          },
        },
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
