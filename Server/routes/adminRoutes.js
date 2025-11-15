// CineSeat / Server / routes / adminRoutes.js
import express from "express";
import { protectAdmin } from "../middleware/auth.js";
import {
  getAllShows,
  getDashBoardData,
  isAdmin,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/is-admin", protectAdmin, isAdmin);
adminRouter.get("/dashboard", protectAdmin, getDashBoardData);
adminRouter.get("/all-shows", protectAdmin, getAllShows);

export default adminRouter;
