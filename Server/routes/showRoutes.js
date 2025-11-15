// CineSeat / Server / routes / showRoutes.js
import express from "express";
import {
  addShow,
  getNowPlayingMovies,
  getShows,
} from "../controllers/showController.js";
import { protectAdmin } from "../middleware/auth.js";

const showRouter = express.Router();

showRouter.get("/now-playing", protectAdmin, getNowPlayingMovies);
showRouter.post("/add", protectAdmin, addShow);
showRouter.get("/all", getShows);

export default showRouter;
