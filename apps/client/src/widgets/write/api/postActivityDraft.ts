import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

export const postActivityDraft = async (
  activity: FormData
): Promise<AxiosResponse> => {
  try {
    const response = await instance.post(
      "/evidence/current/draft/activity",
      activity
    );
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "활동 영역 임시 저장 실패";
    }
    throw error;
  }
};
