import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

interface FeatScore {
  categoryName: string;
  value: number;
}

export const featScore = async (
  email: string,
  category: string,
  score: number
): Promise<AxiosResponse> => {
  const data: FeatScore = {
    categoryName: category,
    value: Number(score),
  };
  try {
    const id = email.split("@")[0]?.slice(1);
    return await instance.patch<FeatScore>(`/score/${id}`, data);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error;
    }
    throw new Error("Unknown error occurred");
  }
};
