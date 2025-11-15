// CineSeat / Server / controllers / userController.js
import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

/* -------- GET USER BOOKINGS -------- */
export const getUserBookings = async (req, res) => {
  try {
    const user = req.auth().userId;

    const bookings = await Booking.find({ user })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Get User Bookings Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get User Bookings Error: ${error.message}`,
    });
  }
};

/* -------- ADD FAVORITE MOVIE IN CLERK USER METADATA -------- */
export const addFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId);

    if (!user.privateMetadata.favorites) {
      user.privateMetadata.favorites = [];
    }

    if (!user.privateMetadata.favorites.includes(movieId)) {
      user.privateMetadata.favorites.push(movieId);
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: user.privateMetadata,
    });

    return res.status(200).json({
      success: true,
      message: "Favorite Movie Added Successfully",
    });
  } catch (error) {
    console.error(
      "Add Favorite Movie in Clerk User MetaData Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: `Add Favorite Movie in Clerk User MetaData Error: ${error.message}`,
    });
  }
};

/* -------- UPDATE FAVORITE MOVIE IN CLERK USER METADATA -------- */
export const updateFavourite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId);

    if (!user.privateMetadata.favorites) {
      user.privateMetadata.favorites = [];
    }

    if (!user.privateMetadata.favorites.includes(movieId)) {
      user.privateMetadata.favorites.push(movieId);
    } else {
      user.privateMetadata.favorites = user.privateMetadata.favorites.filter(
        (item) => item !== movieId
      );
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: user.privateMetadata,
    });

    return res.status(200).json({
      success: true,
      message: "Favourite Movie Updated Successfully",
    });
  } catch (error) {
    console.error(
      "Update Favorite Movie in Clerk User MetaData Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: `Update Favorite Movie in Clerk User MetaData Error: ${error.message}`,
    });
  }
};
