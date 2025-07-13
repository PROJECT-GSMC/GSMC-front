"use client";

import { deleteCookie } from "@repo/utils/deleteCookie";
import { getCookie } from "@repo/utils/getCookie";
import axios, {
  type InternalAxiosRequestConfig,
  type CreateAxiosDefaults,
  AxiosHeaders,
  AxiosError,
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

const instance = axios.create(config);

if (typeof globalThis.window === "object") {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
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

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 403) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
    }
    return Promise.reject(error);
  }
);

export default instance;
