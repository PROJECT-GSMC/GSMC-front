import type { AxiosResponse } from "axios";

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