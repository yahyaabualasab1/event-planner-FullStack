import { api } from "@/services/axios";

export const getClients = () => {
	return api.get("/api/admin-system/client");
};
