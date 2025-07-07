import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

import type { Book } from "@/widgets/write/model/book";

export const patchReading = async (
  evidenceId: number,
  bookData: Book
): Promise<AxiosResponse> => {
  try {
    const response = await instance.patch(
      `evidence/reading/${evidenceId}`,
      bookData
    );
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "독서 영역 수정 실패";
    }
    throw error;
  }
};
