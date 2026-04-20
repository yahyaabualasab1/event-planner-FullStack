import { BookingEnum } from "../../enums/models/booking";

export interface IBookingTimePeriod {
  from: string;
  to: string;
}

export interface IBooking {
  _id: string;
  clientId: string;
  venueId: string;
  customerId: string;
  date: Date;
  status: BookingEnum;
  timePeriod: IBookingTimePeriod[];
}
