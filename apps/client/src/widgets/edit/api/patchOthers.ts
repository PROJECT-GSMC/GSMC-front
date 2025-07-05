import instance from "@repo/api/axios";
import { isAxiosError, type AxiosError, type AxiosResponse } from "axios";

export const patchOthers = async (
  evidenceId: number,
  formData: FormData
): Promise<AxiosError | AxiosResponse> => {
  try {
    const response = await instance.patch(
      `evidence/other/${evidenceId}`,
      formData
    );
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "기타 영역 수정 실패";
    }
    throw error;
  }
};
