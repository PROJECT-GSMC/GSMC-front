import instance from "@repo/api/axios";
import type { AxiosError, AxiosResponse } from "axios";

export const saveDraft = async (
  activity: FormData
): Promise<AxiosError | AxiosResponse> => {
  try {
    const res = await instance.post(
      "/evidence/current/draft/activity",
      activity
    );
    return res;
  } catch (error) {
    return error as AxiosError;
  }
};
