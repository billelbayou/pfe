import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (
  res: Response,
  user: { id: string; role: "ADMIN" | "STUDENT" }
) => {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};
