import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the token from the "Authorization" header
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
    return;
  }

  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    // Attach the decoded user ID and role to the request object
    //@ts-ignore
    req.userId = decoded.id; // Attach the user ID
    //@ts-ignore
    req.role = decoded.role; // Attach the user role

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);

    // Handle specific JWT errors
    if (error instanceof jwt.TokenExpiredError) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized: Token expired" });
      return;
    } else if (error instanceof jwt.JsonWebTokenError) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
      return;
    } else {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Token verification failed",
      });
      return;
    }
  }
};
