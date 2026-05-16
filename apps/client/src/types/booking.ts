export type BookingStatus = "pending" | "approved" | "declined";

export interface BookingTimePeriod {
	from: string;
	to: string;
}

export interface Booking {
	_id: string;
	clientId: string;
	venueId: string;
	customerId: string;
	date: string;
	status: BookingStatus;
	timePeriod: BookingTimePeriod[];
}
