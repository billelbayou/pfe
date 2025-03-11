import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../utils/types";

export const roleMiddleware =
  (roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.role || !roles.includes(req.role)) {
      res.status(403).json({ success: false, message: "Forbidden" });
      return;
    }
    next();
  };
