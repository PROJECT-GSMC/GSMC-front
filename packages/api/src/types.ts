import type { AxiosResponse, InternalAxiosRequestConfig, CreateAxiosDefaults, AxiosHeaderValue } from "axios";

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface CertificationDeleteResponse {
  message: string;
  success: boolean;
}

export type ApiAxiosResponse<T> = AxiosResponse<ApiResponse<T>>;

export interface ApiAxiosConfig extends CreateAxiosDefaults {
  baseURL: string;
  timeout: number;
}

export interface ApiHeaders {
  Authorization?: AxiosHeaderValue;
  [key: string]: AxiosHeaderValue | undefined;
}

export type ApiRequestConfig = Omit<InternalAxiosRequestConfig, "headers"> & {
  headers: ApiHeaders;
}; 