import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";

/* -------- CHECK IF USER IS ADMIN -------- */
export const isAdmin = async (req, res) => {
  return res.status(200).json({ success: true, isAdmin: true });
};

/* -------- GET DASHBOARD DATA -------- */
export const getDashBoardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() },
    }).populate("movie");

    const totalUser = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows,
      totalUser,
    };

    return res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    console.error("Get Dashboard Data Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get Dashboard Data Error: ${error.message}`,
    });
  }
};

/* -------- GET ALL SHOWS -------- */
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });
    return res.status(200).json({ success: true, shows });
  } catch (error) {
    console.error("Get All Shows Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get All Shows Error: ${error.message}`,
    });
  }
};

/* -------- GET ALL BOOKINGS -------- */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({ path: "show", populate: { path: "movie" } })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Get All Bookings Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get All Bookings Error: ${error.message}`,
    });
  }
};
