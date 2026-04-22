import { Venue } from "../../../models/venue.model";
import type {
	CreateVenueInput,
	UpdateVenueInput,
} from "../../../validation/admin-system/venues.schemas";

export async function getAllVenues() {
	return await Venue.find();
}

export async function getVenueById(id: string) {
	const venue = await Venue.findById(id);
	if (!venue) {
		throw new Error("Venue not found");
	}
	return venue;
}

export async function getVenuesByClientId(clientId: string) {
	const venues = await Venue.find({ clientId });
	if (!venues.length) {
		throw new Error("No venues found for this client");
	}
	return venues;
}

export async function createVenue(data: CreateVenueInput) {
	const venue = new Venue(data);
	return await venue.save();
}

export async function updateVenue(id: string, data: UpdateVenueInput) {
	const venue = await Venue.findByIdAndUpdate(id, data, { new: true });
	if (!venue) {
		throw new Error("Venue not found");
	}
	return venue;
}

export async function deleteVenue(id: string) {
	const venue = await Venue.findByIdAndDelete(id);
	if (!venue) {
		throw new Error("Venue not found");
	}
	return venue;
}