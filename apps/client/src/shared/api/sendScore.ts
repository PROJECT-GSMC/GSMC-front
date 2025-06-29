import instance from "@repo/api/axios";
import type { AxiosError, AxiosResponse } from "axios";

export const sendScore = async (
  formData: FormData,
): Promise<AxiosError | AxiosResponse> => {
  try {
    const res = await instance.post("/evidence/current/scoring", formData);
    return res;
  } catch (error) {
    return error as AxiosError;
  }
};
