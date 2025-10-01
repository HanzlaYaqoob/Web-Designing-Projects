import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";

import userRouter from "./routes/userRoutes.js";

import resumeRouter from "./routes/resumeRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());

connectDB();
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/resume", resumeRouter);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, _path) => {
      res.set("Access-Control-Allow-Origin", "http://localhost:5173/");
    },
  })
);
app.route("/").get((req, res) => {
  res.json("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on port : " + PORT);
});
