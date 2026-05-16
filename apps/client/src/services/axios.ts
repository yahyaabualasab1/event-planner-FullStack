import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL =
	import.meta.env.VITE_API_URL?.trim() || "http://localhost:3000";

export const api = axios.create({
	baseURL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = localStorage.getItem("token");

	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});
