import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/api/bookings.api";

export const useBookings = () => {
	return useQuery({
		queryKey: ["bookings"],
		queryFn: async () => {
			const res = await getBookings();
			return res.data;
		},
	});
};
