import { Booking} from "../../../models/booking";
import { IBooking } from "../../../interfaces/models/booking.interface";
import { BookingEnum } from "../../../enums/models/booking";
export const getAllBookings = async (data : BookingEnum ) => {
    return await Booking.find({ deletedAt: null });
};
export const getBookingById = async (id: string) => {
    return await Booking.findOne({ _id: id, deletedAt: null });
};
export const getBookingsByClientId = async (clientId: number) => {
    return await Booking.find({ clientId: clientId, deletedAt: null });
};

export const getBookingsByVenueId = async (venueId: number) => {
    return await Booking.find({ venueId: venueId, deletedAt: null });
};
export const getBookingsByCustomerId = async (customerId: number) => {
    return await Booking.find({ customerId: customerId, deletedAt: null });
};
export const getBookingsByStatus = async (status: BookingEnum) => {
    return await Booking.find({ status: status, deletedAt: null });
};
export const createBooking = async (bookingData: IBooking) => {
    return await Booking.create(bookingData);
};
export const updateBooking = async (id: string, bookingData: Partial<IBooking>) => {
    return await Booking.findOneAndUpdate({ _id: id, deletedAt: null }, bookingData, { new: true });
};
export const deleteBooking = async (id: string) => {
    return await Booking.findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: new Date() }, { new: true });
};

