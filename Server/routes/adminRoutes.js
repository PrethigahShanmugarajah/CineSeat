// CineSeat / Server / routes / adminRoutes.js
import express from "express";
import { protectAdmin } from "../middleware/auth";
import { isAdmin } from "../controllers/adminController";

const adminRouter = express.Router();

adminRouter.get("/is-admin", protectAdmin, isAdmin);

export default adminRouter;
