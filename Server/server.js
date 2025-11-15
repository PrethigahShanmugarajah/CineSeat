// CineSeat / Server /server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

await connectDB();

/* -------- MIDDLEWARE CONFIGURATION -------- */
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

/* -------- ROUTES -------- */
app.get("/", (req, res) => res.send("API is Working"));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
