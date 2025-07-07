import instance from "@repo/api/axios";
import type { PostResponse } from "@repo/types/evidences";
import { isAxiosError } from "axios";

export const getSearchResult = async (
  query: string,
  type?: string
): Promise<PostResponse> => {
  try {
    const response = await instance.get<PostResponse>(
      `/evidence/search?title=${query}&type=${type}`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "증빙 자료 검색 실패";
    }
    throw error;
  }
};
