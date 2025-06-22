import instance from "@repo/api/axios";
import type { AxiosError, AxiosResponse } from "axios";

interface FixScore {
  categoryName: string;
  score: number;
}

export const FixScore = async ({
  categoryName,
  score,
}: FixScore): Promise<AxiosError | AxiosResponse> => {
  const formData = new FormData();
  formData.append("categoryName", categoryName);
  formData.append("score", score.toString());
  try {
    const res = await instance.post("/evidence/current/scoring", formData);
    return res;
  } catch (error) {
    return error as AxiosError;
  }
};
