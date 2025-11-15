// CineSeat / Server / controllers / bookingController.js
import Show from "../models/Show";

/* -------- CHECK AVAILABILITY OF SELECTED SEATS FOR A MOVIE -------- */
export const checkSeatsAvailbility = async (showId, selectedSeats) => {
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
