import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	getVenues,
	updateVenue,
	type VenueStatusValue,
} from "@/api/venues.api";

export const useVenues = () => {
	return useQuery({
		queryKey: ["venues"],
		queryFn: async () => {
			const res = await getVenues();
			return res.data;
		},
	});
};

export const useUpdateVenueStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			status,
		}: {
			id: string;
			status: VenueStatusValue;
		}) => updateVenue(id, { status }),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["venues"] });
		},
	});
};
