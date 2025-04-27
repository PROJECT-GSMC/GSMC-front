import axios, { InternalAxiosRequestConfig } from "axios";
import { getCookie } from "./utils/handleCookie";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

if (typeof window !== "undefined") {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie("accessToken");
    if (accessToken && !["/login", "/signup"].includes(window.location.pathname)) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return config;
  });
}

export default instance;
