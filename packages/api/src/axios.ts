"use client";

import axios, { InternalAxiosRequestConfig } from "axios";
import { getCookie } from "@repo/utils/getCookie";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

if (typeof window !== "undefined") {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (
      getCookie("accessToken") &&
      !["/signin", "/signup"].includes(window.location.pathname)
    ) {
      config.headers.set("Authorization", `Bearer ${getCookie("accessToken")}`);
    }

    return config;
  });
}

export default instance;
