import { Schema, model, type Model } from "mongoose";

import { BookingEnum } from "../enums/models/booking";
import { IBooking } from "../interfaces/models/booking.interface";

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
			type: {
				from: { type: String, required: true },
				to: { type: String, required: true },
			},
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
