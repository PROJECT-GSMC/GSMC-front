import instance from "@repo/api/axios";
import type { EvidenceResponse } from "@repo/types/evidences";
import { isAxiosError } from "axios";

export const getSearchResult = async (
  query: string,
  type?: string
): Promise<EvidenceResponse> => {
  try {
    const response = await instance.get<EvidenceResponse>(
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
