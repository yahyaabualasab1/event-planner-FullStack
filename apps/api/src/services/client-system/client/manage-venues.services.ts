import { Venue } from "../../../models/venue.model";
import type {
	CreateManageVenueInput,
	UpdateManageVenueInput,
} from "../../../validation/client-system/manage-venues.schemas"; 

export async function getAllManageVenues() {
	return await Venue.find({ isDeleted: false });
}

export async function getManageVenueById(id: string) {
	const venue = await Venue.findOne({ _id: id, isDeleted: false });
	if (!venue) {
		throw new Error("Venue not found");
	}
	return venue;
}

export async function getManageVenuesByClientId(clientId: string) {
	return await Venue.find({ clientId, isDeleted: false });
}

export async function createManageVenue(data: CreateManageVenueInput) {
	const venue = new Venue(data);
	return await venue.save();
}

export async function updateManageVenue(
	id: string,
	data: UpdateManageVenueInput,
) {
	const venue = await Venue.findOneAndUpdate(
		{ _id: id, isDeleted: false },
		data,
		{ new: true },
	);
	if (!venue) {
		throw new Error("Venue not found");
	}
	return venue;
}

export async function deleteManageVenue(id: string) {
	const venue = await Venue.findOneAndUpdate(
		{ _id: id, isDeleted: false },
		{ isDeleted: true },
		{ new: true },
	);
	if (!venue) {
		throw new Error("Venue not found");
	}
	return venue;
}

export const clientManageVenueServices = {
	getAllManageVenues,
	getManageVenueById,
	getManageVenuesByClientId,
	createManageVenue,
	updateManageVenue,
	deleteManageVenue,
};
