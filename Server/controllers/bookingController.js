// CineSeat / Server / controllers / bookingController.js
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

/* -------- CHECK AVAILABILITY OF SELECTED SEATS FOR A MOVIE -------- */
export const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;

    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);

    return !isAnySeatTaken;
  } catch (error) {
    console.error(
      "Check Availability of Selected Seats for a Movie Error:",
      error.message
    );

    return false;
  }
};

/* -------- CREATE BOOKING -------- */
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    // Check if the Seat is Available for the Selected Show
    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Selected Seats are not Available",
      });
    }

    // Get the show Details
    const showData = await Show.findById(showId).populate("movie");

    // Create a new Booking
    const booking = await Booking.createBooking({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    selectedSeats.map((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified("occupiedSeats");

    await showData.save();

    // Stripe Gateway Initialize
    return res.status(200).json({
      success: true,
      message: "Booked Successfully",
    });
  } catch (error) {
    console.error("Create Booking Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Create Booking Error: ${error.message}`,
    });
  }
};
