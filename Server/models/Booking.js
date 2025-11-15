// CineSeat / Server / models / Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, ref: "User" },
    show: { type: String, required: true, ref: "Show" },
    amount: { type: Number, required: true },
    bookedSeats: { type: Array, required: true },
    isPaid: { type: Boolean, required: true },
    paymentLink: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Boooking", bookingSchema);

export default Booking;
