import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import transcriptRoutes from "./routes/transcript.route";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/transcripts", transcriptRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
