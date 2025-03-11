import express from "express";
import { checkAuth, login, signup } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/check-auth", verifyToken, checkAuth);

export default router;
