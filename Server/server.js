// CineSeat / Server /server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

const app = express();
const port = process.env.PORT || 3000;

await connectDB();

/* -------- MIDDLEWARE CONFIGURATION -------- */
app.use(express.json());
app.use(cors());

/* -------- ROUTES -------- */
app.get("/", (req, res) => res.send("API is Working"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
