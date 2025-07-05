import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

export const postScoring = async (
  formData: FormData
): Promise<AxiosResponse> => {
  try {
    const response = await instance.post("/evidence/current/scoring", formData);
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "외국어 영역 저장 실패";
    }
    throw error;
  }
};
