"use client";

import type { InternalAxiosRequestConfig } from "axios";
const axios = require("axios");
const { getCookie } = require("@repo/utils/getCookie");

const TIMEOUT = 10_000;

const instance = axios.create({
  baseURL: process.env["NEXT_PUBLIC_API_URL"],
  timeout: TIMEOUT,
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
