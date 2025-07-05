import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

export const patchScore = async (
  evidenceId: number,
  formData: FormData
): Promise<AxiosResponse> => {
  try {
    const response = await instance.patch(
      `evidence/reading/${evidenceId}`,
      formData
    );
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "외국어 영역 수정 실패";
    }
    throw error;
  }
};
