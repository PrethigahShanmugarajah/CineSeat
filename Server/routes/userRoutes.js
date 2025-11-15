// CineSeat / Server / routes / userRoutes.js
import express from "express";
import {
  addFavorite,
  getUserBookings,
  updateFavourite,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/bookings", getUserBookings);
userRouter.post("/add-favorite", addFavorite);
userRouter.post("/update-favorite", updateFavourite);

export default userRouter;
