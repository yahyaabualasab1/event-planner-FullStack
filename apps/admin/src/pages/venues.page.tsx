import { useVenues } from "@/hooks/use-venues";

interface Venue {
	_id: string;
	clientId: string;
	title: string;
	description: string;
	location: string;
	price: string;
	images: string[];
	extras: string;
	availability: { from: string; to: string }[];
	discounts?: string;
	isDeleted: boolean;
}

const mockVenues: Venue[] = [
	{
		_id: "venue-mock-1",
		clientId: "client-102",
		title: "Riverside Events",
		description: "Waterfront venue with modern facilities.",
		location: "Brooklyn Waterfront, NY",
		price: "$3500",
		images: [
			"https://images.unsplash.com/photo-1519167758481-83f29c2c7bcd?q=80&w=1200&auto=format&fit=crop",
		],
		extras: "AV, Catering",
		availability: [{ from: "09:00", to: "22:00" }],
		discounts: "10% weekday",
		isDeleted: false,
	},
	{
		_id: "venue-mock-2",
		clientId: "client-207",
		title: "Grand Ballroom",
		description: "Classic ballroom for weddings and events.",
		location: "Downtown, Chicago",
		price: "$5000",
		images: [
			"https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
		],
		extras: "Stage, Lighting",
		availability: [{ from: "10:00", to: "23:00" }],
		discounts: "",
		isDeleted: false,
	},
];

const VenueCard = ({ venue }: { venue: Venue }) => {
	const status = venue.isDeleted ? "Archived" : "Active";
	const imageUrl = venue.images?.[0];
	const availabilityLabel = venue.availability?.length
		? `${venue.availability[0].from} - ${venue.availability[0].to}`
		: "N/A";

	return (
		<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
			<div className="flex flex-col gap-6 lg:flex-row lg:items-start">
				<div className="w-full lg:w-44">
					<div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
						{imageUrl ? (
							<img
								src={imageUrl}
								alt={venue.title}
								className="h-full w-full object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
								No image
							</div>
						)}
					</div>
				</div>

				<div className="flex-1 space-y-4">
					<div className="flex items-start justify-between gap-4">
						<div>
							<h3 className="text-lg font-semibold text-gray-900">
								{venue.title}
							</h3>
							<p className="text-sm text-gray-500">
								Client ID {venue.clientId}
							</p>
							<p className="text-sm text-gray-500">
								{venue.location}
							</p>
						</div>
						<span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-semibold">
							{status}
						</span>
					</div>

					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
						<div className="bg-gray-50 rounded-xl px-4 py-3">
							<p className="text-xs text-gray-400">Price</p>
							<p className="text-sm font-semibold text-gray-900">
								{venue.price || "N/A"}
							</p>
						</div>
						<div className="bg-gray-50 rounded-xl px-4 py-3">
							<p className="text-xs text-gray-400">
								Availability
							</p>
							<p className="text-sm font-semibold text-gray-900">
								{availabilityLabel}
							</p>
						</div>
						<div className="bg-gray-50 rounded-xl px-4 py-3">
							<p className="text-xs text-gray-400">Discounts</p>
							<p className="text-sm font-semibold text-gray-900">
								{venue.discounts || "N/A"}
							</p>
						</div>
						<div className="bg-gray-50 rounded-xl px-4 py-3">
							<p className="text-xs text-gray-400">Extras</p>
							<p className="text-sm font-semibold text-gray-900">
								{venue.extras || "N/A"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const VenuesPage = () => {
	const { data, isLoading, isError } = useVenues();
	const venues = (data ?? []) as Venue[];
	const list = venues.length ? venues : mockVenues;

	return (
		<div className="space-y-6">
			<header>
				<h2 className="text-2xl font-bold text-gray-900">Venues</h2>
				<p className="text-sm text-gray-500">
					Review and manage venue listings
				</p>
			</header>

			<div className="space-y-6">
				{isLoading && (
					<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
						<p className="text-sm text-gray-500">
							Loading venues...
						</p>
					</div>
				)}

				{isError && (
					<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
						<p className="text-sm text-red-500">
							Failed to load venues.
						</p>
					</div>
				)}

				{!isLoading &&
					!isError &&
					list.map((venue) => (
						<VenueCard key={venue._id} venue={venue} />
					))}
			</div>
		</div>
	);
};
