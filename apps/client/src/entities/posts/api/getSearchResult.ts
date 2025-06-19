import instance from "@repo/api/axios";
import type { AxiosError, AxiosResponse } from "axios";

export const getSearchResult = async (
  query: string,
  type?: string
): Promise<AxiosError | AxiosResponse> => {
  try {
    const res = instance.get(`/evidence/search?title=${query}&type=${type}`);
    return res;
  } catch (error) {
    return error as AxiosError;
  }
};
