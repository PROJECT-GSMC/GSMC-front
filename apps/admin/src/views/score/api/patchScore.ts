import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

import { extractStudentCode } from "@/shared/util/extractStudentId";

interface PatchScore {
  categoryName: string;
  value: number;
}

export const patchScore = async (
  email: string,
  category: string,
  score: number
): Promise<AxiosResponse<PatchScore>> => {
  const data: PatchScore = {
    categoryName: category,
    value: score,
  };
  const studentCode = extractStudentCode(email);
  try {
    const response = await instance.patch(`/score/${studentCode}`, data);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "학생 점수를 수정하는 데 실패했습니다.";
    }
    throw error;
  }
};
