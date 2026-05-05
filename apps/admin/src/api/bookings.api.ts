import { api } from "@/services/axios";

export const getBookings = () => {
	return api.get("/api/admin-system/bookings");
};
