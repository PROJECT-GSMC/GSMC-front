import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

export const postActivity = async (
  activity: FormData
): Promise<AxiosResponse> => {
  try {
    const response = await instance.post("evidence/current/activity", activity);
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "활동영역 저장 실패";
    }
    throw error;
  }
};
