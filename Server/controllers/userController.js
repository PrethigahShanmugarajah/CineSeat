// CineSeat / Server / controllers / userController.js
import Booking from "../models/Booking";

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
