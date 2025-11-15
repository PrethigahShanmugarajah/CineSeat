// CineSeat / Server / routes / userRoutes.js
import express from "express";
import { addFavorite, getUserBookings } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/bookings", getUserBookings);
userRouter.post("/add-favorite", addFavorite);

export default userRouter;
