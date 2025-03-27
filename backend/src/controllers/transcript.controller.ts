import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AuthRequest, DataInterface } from "../utils/types";
import { Transcript } from "@prisma/client";

export const createTranscript = async (req: AuthRequest, res: Response) => {
  const data: DataInterface = req.body;
  const { userId } = req;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: User ID not found",
    });
    return;
  }

  const student = await prisma.student.findUnique({
    where: { userId },
  });

  if (!student) {
    res.status(404).json({
      success: false,
      message: "Student not found for the given user",
    });
    return;
  }

  try {
    await prisma.transcript.create({
      data: {
        studentId: student.id,
        semester: `S${data.semestreNum}`,
        year: data.year,
        average: Number(data.semestre.moyenne), // Ensure it's a number
        credits: Number(data.semestre.credits),
        unites: {
          create: data.semestre.unites.map((unite) => ({
            name: unite.name,
            title: unite.title,
            coef: unite.coefficient ? Number(unite.coefficient) : undefined,
            moy: Number(unite.moyenne),
            credit: Number(unite.credits),
            courses: {
              create: unite.modules.map((module) => ({
                courseName: module.name,
                coefficient: Number(module.coef),
                td: module.td !== undefined ? Number(module.td) : undefined,
                tp: module.tp !== undefined ? Number(module.tp) : undefined,
                exam: Number(module.exam),
                moy: Number(module.moyenne),
                credits: Number(module.credit),
              })),
            },
          })),
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

    res.status(201).json({ success: true, message: "Transcript created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create transcript" });
  }
};

export const getAllTranscripts = async (req: AuthRequest, res: Response) => {
  try {
    const transcripts = await prisma.transcript.findMany({
      include: {
        unites: {
          include: {
            courses: true,
          },
        },
      },
    });

    res.status(200).json({ success: true, transcripts });
  } catch (error) {
    console.error("Error fetching transcripts:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch transcripts" });
  }
};

export const getTranscriptById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const transcript = await prisma.transcript.findUnique({
      where: { id }, // No need for Number(id) since it's a string
      include: {
        unites: {
          include: {
            courses: true,
          },
        },
      },
    });

    if (!transcript) {
      res.status(404).json({ success: false, message: "Transcript not found" });
      return;
    }

    res.status(200).json({ success: true, transcript });
  } catch (error) {
    console.error("Error fetching transcript:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch transcript" });
  }
};

export const getStudentTranscripts = async (
  req: AuthRequest,
  res: Response
) => {
  const { userId } = req;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: User ID not found",
    });
    return;
  }

  try {
    const student = await prisma.student.findUnique({
      where: { userId },
      include: {
        transcripts: {
          include: {
            unites: {
              include: {
                courses: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found for the given user",
      });
      return;
    }

    res.status(200).json({ success: true, transcripts: student.transcripts });
  } catch (error) {
    console.error("Error fetching student transcripts:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch transcripts" });
  }
};