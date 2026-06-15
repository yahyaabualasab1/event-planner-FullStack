import axios, { InternalAxiosRequestConfig } from "axios";
export const api = axios.create({
  baseURL:  "https://dev-event-planner-608310769455.europe-west1.run.app",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
