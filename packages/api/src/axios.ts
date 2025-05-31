"use client";

const axios = require("axios");
import type { InternalAxiosRequestConfig } from "axios";
const { getCookie } = require("@repo/utils/getCookie");

const instance = axios.create({
  baseURL: process.env["NEXT_PUBLIC_API_URL"],
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

module.exports = instance;
