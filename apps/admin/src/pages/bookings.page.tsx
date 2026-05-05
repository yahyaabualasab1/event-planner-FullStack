import { useBookings } from "@/hooks/use-bookings";
import { useEffect } from "react";

interface Booking {
	_id: string;
	clientId: string;
	venueId: string;
	customerId: string;
	date: string;
	status: string;
	timePeriod: { from: string; to: string }[];
}

const formatDate = (value?: string) => {
	if (!value) return "-";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "-";
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
};

const formatStatus = (status?: string) => {
	if (!status) return "Pending";
	return status.charAt(0).toUpperCase() + status.slice(1);
};

const mockBookings: Booking[] = [
	{
		_id: "mock-1",
		clientId: "client-102",
		venueId: "venue-22",
		customerId: "customer-19",
		date: "2026-04-25T00:00:00.000Z",
		status: "pending",
		timePeriod: [{ from: "10:00", to: "14:00" }],
	},
	{
		_id: "mock-2",
		clientId: "client-207",
		venueId: "venue-11",
		customerId: "customer-41",
		date: "2026-05-10T00:00:00.000Z",
		status: "pending",
		timePeriod: [{ from: "16:00", to: "20:00" }],
	},
];

const BookingCard = ({ booking }: { booking: Booking }) => {
	return (
		<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h3 className="text-lg font-semibold text-gray-900">
						Venue ID {booking.venueId}
					</h3>
					<p className="text-sm text-gray-400">
						Request received on {formatDate(booking.date)}
					</p>
				</div>
				<span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-semibold">
					{formatStatus(booking.status)}
				</span>
			</div>

			<div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
				<div className="space-y-3">
					<p className="text-xs font-semibold text-gray-400">
						CLIENT INFORMATION
					</p>
					<p className="text-sm font-semibold text-gray-900">
						Client ID {booking.clientId}
					</p>
					<p className="text-sm text-gray-500">
						Customer ID {booking.customerId}
					</p>
					<p className="text-sm text-gray-500">
						Booking ID {booking._id}
					</p>
				</div>

				<div className="space-y-3">
					<p className="text-xs font-semibold text-gray-400">
						EVENT DETAILS
					</p>
					<div className="grid gap-3 sm:grid-cols-2">
						<div className="bg-gray-50 rounded-xl px-4 py-3">
							<div className="flex items-center gap-2 text-indigo-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={1.8}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
									/>
								</svg>
								<span className="text-xs text-gray-400">
									Event Date
								</span>
							</div>
							<p className="text-sm font-semibold text-gray-900 mt-1">
								{formatDate(booking.date)}
							</p>
						</div>
						<div className="bg-gray-50 rounded-xl px-4 py-3">
							<div className="flex items-center gap-2 text-indigo-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={1.8}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 6v6l4 2"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 22a10 10 0 100-20 10 10 0 000 20z"
									/>
								</svg>
								<span className="text-xs text-gray-400">
									Time Period
								</span>
							</div>
							<p className="text-sm font-semibold text-gray-900 mt-1">
								{booking.timePeriod?.length
									? `${booking.timePeriod[0].from} - ${booking.timePeriod[0].to}`
									: "-"}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 border-t border-gray-100 pt-4">
				<p className="text-xs text-gray-400">Booking Reference</p>
				<p className="text-lg font-semibold text-indigo-600">
					{booking._id}
				</p>
			</div>
		</div>
	);
};

export const BookingsPage = () => {
	const { data, isLoading, isError } = useBookings();
	const bookings = (data ?? []) as Booking[];
	const list = bookings.length ? bookings : mockBookings;

	useEffect(() => {
		if (!isLoading && !isError && bookings.length === 0) {
			console.log("No bookings found. Showing mock data.");
		}
	}, [bookings.length, isError, isLoading]);

	return (
		<div className="space-y-6">
			<header>
				<h2 className="text-2xl font-bold text-gray-900">
					Booking Requests
				</h2>
				<p className="text-sm text-gray-500">
					Review and manage incoming booking requests
				</p>
			</header>

			<div className="space-y-6">
				{isLoading && (
					<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
						<p className="text-sm text-gray-500">
							Loading bookings...
						</p>
					</div>
				)}

				{isError && (
					<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
						<p className="text-sm text-red-500">
							Failed to load bookings.
						</p>
					</div>
				)}

				{!isLoading &&
					!isError &&
					list.map((booking) => (
						<BookingCard key={booking._id} booking={booking} />
					))}
			</div>
		</div>
	);
};
