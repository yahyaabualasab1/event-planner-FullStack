import { Booking} from "../../../models/booking";
import { IBooking } from "../../../interfaces/models/booking.interface";
import { BookingEnum } from "../../../enums/models/booking";
export const getAllBookings = async ( ) => {
    return await Booking.find();
};
export const getBookingById = async (id: string) => {
    return await Booking.findById(id); 
};
export const getBookingsByClientId = async (clientId: number) => {
    return await Booking.find({ clientId: clientId });
};
export const getBookingsByVenueId = async (venueId: number) => {
    return await Booking.find({ venueId: venueId });
};
export const getBookingsByCustomerId = async (customerId: number) => {
    return await Booking.find({ customerId: customerId });
};
export const getBookingsByStatus = async (status: BookingEnum) => {
    return await Booking.find({ status: status });
};
export const createBooking = async (bookingData: IBooking) => {
    return await Booking.create(bookingData);
};
export const updateBooking = async (id: string, bookingData: Partial<IBooking>) => {
  const updated = await Booking.findByIdAndUpdate(id, bookingData, {
    new: true,
  });

  if (!updated) {
    throw new Error("Booking not found");
  }

  return updated;
};
export const deleteBooking = async (id: string) => {
    const booking = await Booking.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });

    if (!booking) {
        throw new Error("Booking not found");
    }

    return booking;
};

