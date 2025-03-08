import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    //@ts-ignore
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("Error verifying token:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
