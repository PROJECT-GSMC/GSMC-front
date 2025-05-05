"use client";

import axios, { InternalAxiosRequestConfig } from "axios";
import { getCookie } from "./utils/getCookie";

const FormInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

if (typeof window !== "undefined") {
  FormInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (
        getCookie("accessToken") &&
        !["/signin", "/signup"].includes(window.location.pathname)
      ) {
        config.headers.set(
          "Authorization",
          `Bearer ${getCookie("accessToken")}`
        );
      }

      config.headers.set("Content-Type", "multipart/form-data");

      return config;
    }
  );
}

export default FormInstance;
