import instance from "@repo/api/axios";
import { AxiosError, type AxiosResponse } from "axios";

interface FeatScoreResponse {
  categoryName: string;
  value: number;
}

interface FeatScoreRequest {
  email: string;
  category: string;
  score: number;
}

export const featScore = async (
  email: string,
  category: string,
  score: number
): Promise<AxiosResponse<FeatScoreResponse>> => {
  const data: FeatScoreRequest = {
    email,
    category,
    score,
  };
  try {
    return await instance.patch<FeatScoreResponse>("/score", data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("Unknown error occurred");
  }
};
