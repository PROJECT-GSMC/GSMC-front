import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

import type { Book } from "../model/book";

export const postBookDraft = async (data: Book): Promise<AxiosResponse> => {
  try {
    const response = await instance.post(
      "/evidence/current/draft/reading",
      data
    );
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "독서영역 임시 저장 실패";
    }
    throw error;
  }
};
