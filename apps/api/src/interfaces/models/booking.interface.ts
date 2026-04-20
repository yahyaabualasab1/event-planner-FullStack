import { type Types } from "mongoose";

import { BookingEnum } from "../../enums/models/booking";

export interface IBookingTimePeriod {
	from: string;
	to: string;
}

export interface IBooking {
	clientId: String;
	venueId: String;
	customerId: String;
	date: Date;
	status: BookingEnum;
	timePeriod: IBookingTimePeriod;
}
