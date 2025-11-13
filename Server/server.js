// CineSeat / Server /server.js
import express from "express";
import cors from "cors";
// import connectDB from "./config/db.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

// await connectDB();

/* -------- MIDDLEWARE CONFIGURATION -------- */
app.use(express.json());
app.use(cors());

/* -------- ROUTES -------- */
app.get("/", (req, res) => res.send("API is Working"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
