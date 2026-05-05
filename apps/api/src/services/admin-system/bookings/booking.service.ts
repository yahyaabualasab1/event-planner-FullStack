import { Booking } from "../../../models/booking";
import { IBooking } from "../../../interfaces/models/booking.interface";
import { BookingEnum } from "../../../enums/models/booking";
export const getAllBookings = async () => {
	return await Booking.find();
};
export const getBookingById = async (id: string) => {
	return await Booking.findById(id).where({ isDeleted: false });
};
export const getBookingsByClientId = async (clientId: number) => {
	return await Booking.find({ clientId: clientId }).where({
		isDeleted: false,
	});
};
export const getBookingsByVenueId = async (venueId: number) => {
	return await Booking.find({ venueId: venueId }).where({ isDeleted: false });
};
export const getBookingsByCustomerId = async (customerId: number) => {
	return await Booking.find({ customerId: customerId }).where({
		isDeleted: false,
	});
};
export const getBookingsByStatus = async (status: BookingEnum) => {
	return await Booking.find({ status: status }).where({ isDeleted: false });
};
export const createBooking = async (bookingData: IBooking) => {
	return await Booking.create({ ...bookingData, isDeleted: false });
};
export const updateBooking = async (
	id: string,
	bookingData: Partial<IBooking>,
) => {
	const updated = await Booking.findByIdAndUpdate(id, bookingData, {
		new: true,
	}).where({ isDeleted: false });

	if (!updated) {
		throw new Error("Booking not found");
	}

	return updated;
};
export const deleteBooking = async (id: string) => {
	const booking = await Booking.findByIdAndUpdate(
		id,
		{ deletedAt: new Date(), isDeleted: true },
		{ new: true },
	).where({ isDeleted: false });

	if (!booking) {
		throw new Error("Booking not found");
	}

	return booking;
};

export const bookingService = {
	getAllBookings,
	getBookingById,
	getBookingsByClientId,
	getBookingsByVenueId,
	getBookingsByCustomerId,
	getBookingsByStatus,
	createBooking,
	updateBooking,
	deleteBooking,
};
