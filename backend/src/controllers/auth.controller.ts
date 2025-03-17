import { Request, Response } from "express";
import { prisma } from "../db/prisma"; // Import the Prisma instance
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";
import { AuthRequest } from "../utils/types";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, role = "STUDENT" } = req.body;

  // Validate role
  if (!["ADMIN", "STUDENT"].includes(role)) {
    res.status(400).json({ error: "Invalid role" });
    return;
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(400).json({ error: "User with this email already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    if (role === "STUDENT") {
      // Create Student User
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "STUDENT",
          student: {
            create: { name, email },
          },
        },
      });
    } else {
      // Create Admin User
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "ADMIN",
          admin: {
            create: { name, email },
          },
        },
      });
    }

    res.status(201).json({ message: "User registered successfully" });
    return;
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(404).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = generateTokenAndSetCookie(res, user);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: { token, role: user.role },
    });
    return;
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const checkAuth = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId || !req.role) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    let userData: any = null;

    if (req.role === "STUDENT") {
      userData = await prisma.student.findUnique({
        where: { userId: req.userId },
        select: { id: true, name: true, email: true, createdAt: true },
      });
    } else if (req.role === "ADMIN") {
      userData = await prisma.admin.findUnique({
        where: { userId: req.userId },
        select: { id: true, name: true, email: true },
      });
    }

    if (!userData) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User authenticated",
      user: {
        role: req.role,
        ...userData,
      },
    });
    return;
  } catch (error) {
    console.error("Error checking auth:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
