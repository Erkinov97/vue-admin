import axios from "axios";
const DEFAULT_URL = import.meta.env.VITE_APP_API_URL;
import { useAuthStore } from "@/store";
export const useFetch = axios.create({
  baseURL: DEFAULT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
useFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
useFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      useAuthStore().refreshToken();
    }
    return Promise.reject(error);
  }
);
