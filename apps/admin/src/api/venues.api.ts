import { api } from "@/services/axios";

export type VenueStatusValue = "pending" | "approved" | "flagged";

export const getVenues = () => {
	return api.get("/api/admin-system/venues");
};

export const updateVenue = (
	id: string,
	payload: { status?: VenueStatusValue },
) => {
	return api.patch(`/api/admin-system/venues/${id}`, payload);
};
