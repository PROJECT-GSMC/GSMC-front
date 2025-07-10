import instance from "@repo/api";
import { AxiosError } from "axios";
import { toast } from "sonner";

import type { ScoreResponse } from "../model/score";

export const getScore = async (
  id: string
): Promise<ScoreResponse | undefined> => {
  try {
    const res = await instance.get(`/score/${id}`);
    return res.data as ScoreResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error("점수 정보를 불러오는데 실패했습니다");
    }
  }
  return undefined;
};
