import axios, { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = localStorage.getItem("customerToken");

	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});
