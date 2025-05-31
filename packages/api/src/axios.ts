"use client";

import { getCookie } from "@repo/utils";
import axios, { 
  type InternalAxiosRequestConfig,
  type CreateAxiosDefaults,
  AxiosHeaders 
} from "axios";

const TIMEOUT = 10_000;

const apiUrl = process.env["NEXT_PUBLIC_API_URL"];
if (apiUrl == null || apiUrl === "") {
  throw new Error("API URL not found");
}

const config: CreateAxiosDefaults = {
  baseURL: apiUrl,
  timeout: TIMEOUT,
};

const axiosInstance = axios.create(config);

if (typeof globalThis.window === "object") {
  axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie("accessToken");
    if (
      typeof accessToken === "string" &&
      !["/signin", "/signup"].includes(globalThis.window.location.pathname)
    ) {
      const headers = new AxiosHeaders(config.headers);
      headers.set("Authorization", `Bearer ${accessToken}`);
      config.headers = headers;
    }

    return config;
  });
}

export { axiosInstance };
