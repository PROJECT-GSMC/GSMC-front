"use client";

import { getCookie } from "@repo/utils";

import type { InternalAxiosRequestConfig, AxiosInstance, CreateAxiosDefaults } from "axios";
import axios from "axios";

const TIMEOUT = 10_000;

const config: CreateAxiosDefaults = {
  baseURL: process.env["NEXT_PUBLIC_API_URL"] ?? "",
  timeout: TIMEOUT,
};

const instance: AxiosInstance = axios.create(config);

if (typeof globalThis.window !== "undefined") {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie("accessToken");
    if (
      typeof accessToken === "string" &&
      !["/signin", "/signup"].includes(globalThis.window.location.pathname)
    ) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return config;
  });
}

export default instance;
