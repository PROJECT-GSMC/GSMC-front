import instance from "@repo/api/axios";
import type { DraftResponse } from "@repo/types/draft";
import { isAxiosError } from "axios";

export const getDraft = async (): Promise<DraftResponse> => {
  try {
    const response = await instance.get<DraftResponse>(
      "/evidence/current/draft"
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "임시저장 게시물 조회 실패";
    }
    throw error;
  }
};
