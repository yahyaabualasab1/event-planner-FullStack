import { Booking } from "../../../models/booking";
import { IBooking } from "../../../interfaces/models/booking.interface";
import { BookingEnum } from "../../../enums/models/booking";
export const getAllBookings = async () => {
  return await Booking.find({ isDeleted: false })
    .populate("clientId", "fullName email")
    .populate("venueId", "title location")
    .populate("customerId", "fullName email");
};
export const getBookingById = async (id: string) => {
  return await Booking.findById(id)
    .populate("clientId", "fullName email")
    .populate("venueId", "title location")
    .populate("customerId", "fullName email");
};
export const getBookingsByClientId = async (clientId: number) => {
  return await Booking.find({ clientId, isDeleted: false })
    .populate("clientId", "fullName email")
    .populate("venueId", "title location")
    .populate("customerId", "fullName email");
};
export const getBookingsByVenueId = async (venueId: number) => {
  return await Booking.find({ venueId, isDeleted: false })
    .populate("clientId", "fullName email")
    .populate("venueId", "title location")
    .populate("customerId", "fullName email");
};
export const getBookingsByCustomerId = async (customerId: number) => {
  return await Booking.find({ customerId, isDeleted: false })
    .populate("clientId", "fullName email")
    .populate("venueId", "title location")
    .populate("customerId", "fullName email");
};
export const getBookingsByStatus = async (status: BookingEnum) => {
  return await Booking.find({ status, isDeleted: false })
    .populate("clientId", "fullName email")
    .populate("venueId", "title location")
    .populate("customerId", "fullName email");
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
  })
    .populate("clientId", "fullName email")
    .populate("venueId", "title location")
    .populate("customerId", "fullName email");

  if (!updated || updated.isDeleted) {
    throw new Error("Booking not found");
  }

  return updated;
};
export const deleteBooking = async (id: string) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    { deletedAt: new Date(), isDeleted: true },
    { new: true },
  )
    .populate("clientId", "fullName email")
    .populate("venueId", "title location")
    .populate("customerId", "fullName email");

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
