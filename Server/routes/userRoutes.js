import express from "express";
import {
  addFavorite,
  getFavourites,
  getUserBookings,
  updateFavourite,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/bookings", getUserBookings);
userRouter.post("/add-favorite", addFavorite);
userRouter.post("/update-favorite", updateFavourite);
userRouter.get("/favorites", getFavourites);

export default userRouter;
