import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import stripe from "stripe";

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
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
      isPaid: false,
    });

    selectedSeats.map((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified("occupiedSeats");

    await showData.save();

    // Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // Creating line items to for Stripe
    const line_items = [
      {
        price_data: {
          currency: "LKR",
          product_data: {
            name: showData.movie.title,
          },
          unit_amount: Math.floor(booking.amount) * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      line_items: line_items,
      mode: "payment",
      metadata: {
        bookingId: booking._id.toString(),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // Expires in 30 minutes
    });

    booking.paymentLink = session.url;
    await booking.save();

    // Run Inngest Sheduler Function to check payment status after 10 minutes
    await inngest.send({
      name: "app/checkpayment",
      data: {
        bookingId: booking._id.toString(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Booked Successfully",
      url: session.url,
    });
  } catch (error) {
    console.error("Create Booking Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Create Booking Error: ${error.message}`,
    });
  }
};

/* -------- GET OCCUPIED SEATS -------- */
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);

    const occupiedSeats = Object.keys(showData.occupiedSeats);

    return res.status(200).json({ success: true, occupiedSeats });
  } catch (error) {
    console.error("Get Occupied Seats Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get Occupied Seats Error: ${error.message}`,
    });
  }
};
