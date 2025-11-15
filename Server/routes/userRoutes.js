// CineSeat / Server / routes / userRoutes.js
import express from "express";
import { getUserBookings } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/bookings", getUserBookings);

export default userRouter;
