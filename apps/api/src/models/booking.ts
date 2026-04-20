import { Schema, model, type Model } from "mongoose";

import { BookingEnum } from "../enums/models/booking";
import { IBooking, IBookingTimePeriod } from "../interfaces/models/booking.interface";

const bookingTimePeriodSchema = new Schema<IBookingTimePeriod>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  { _id: false },
);

const bookingSchema = new Schema<IBooking>(
  {
    clientId: {
      type: String,
      required: true,
      ref: "Client",
    },
    venueId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(BookingEnum),
    },
    timePeriod: {
      type: [bookingTimePeriodSchema],
      required: true,
    },
  },
  { collection: "bookings" },
);

export const Booking: Model<IBooking> = model<IBooking>(
  "Booking",
  bookingSchema,
);

export { bookingSchema };
