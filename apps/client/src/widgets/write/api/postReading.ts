import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

import type { Book } from "../model/book";

export const postReading = async (bookData: Book): Promise<AxiosResponse> => {
  try {
    const response = await instance.post("evidence/current/reading", bookData);
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "독서 영역 저장 실패";
    }
    throw error;
  }
};
