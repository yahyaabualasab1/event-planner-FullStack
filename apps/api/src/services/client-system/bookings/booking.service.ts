import { BookingEnum } from "../../../enums/models/booking";
import { Booking } from "../../../models/booking";

export const getBookingsForClient = async (
	clientId: string,
	status?: BookingEnum,
) => {
	const filter: Record<string, unknown> = {
		clientId,
		isDeleted: false,
	};

	if (status) {
		filter.status = status;
	}

	return Booking.find(filter).sort({ date: -1 });
};

export const getBookingByIdForClient = async (
	id: string,
	clientId: string,
) => {
	return Booking.findOne({ _id: id, clientId, isDeleted: false });
};

export const updateBookingStatusForClient = async (
	id: string,
	clientId: string,
	status: BookingEnum,
) => {
	return Booking.findOneAndUpdate(
		{ _id: id, clientId, isDeleted: false },
		{ status },
		{ new: true },
	);
};

export const clientBookingService = {
	getBookingsForClient,
	getBookingByIdForClient,
	updateBookingStatusForClient,
};
