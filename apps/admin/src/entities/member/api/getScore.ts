import instance from "@repo/api";
import { isAxiosError } from "axios";

import type { ScoreResponse } from "../model/score";

export const getScore = async (id: string): Promise<ScoreResponse> => {
  try {
    const res = await instance.get<ScoreResponse>(`/score/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "점수 정보를 불러오는데 실패했습니다";
    }
    throw error;
  }
};
