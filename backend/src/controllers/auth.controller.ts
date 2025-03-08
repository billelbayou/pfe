import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
      return;
    }
    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    generateTokenAndSetCookie(res, user._id);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user.toObject(), password: undefined },
    });
  } catch (error) {
    console.log("Error signing up: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "Invalid credentials" });
      return;
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(404).json({ success: false, message: "Invalid credentials" });
      return;
    }
    generateTokenAndSetCookie(res, user._id);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: { ...user.toObject(), password: undefined },
    });
  } catch (error) {
    console.log("Error logging in: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User found",
      user: { ...user.toObject(), password: undefined },
    });
  } catch (error) {
    console.log("Error checking auth: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
