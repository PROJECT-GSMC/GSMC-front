import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

if (typeof window !== "undefined") {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (
      localStorage.getItem("accessToken") &&
      !["/login", "/signup"].includes(window.location.pathname)
    ) {
      config.headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("accessToken")}`
      );
    }

    return config;
  });
}

export default instance;
