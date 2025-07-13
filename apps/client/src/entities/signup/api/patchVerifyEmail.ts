import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

export const patchVerifyEmail = async (
  code: number
): Promise<AxiosResponse> => {
  try {
    const response = await instance.patch(`/auth/verify-email`, { code });
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "인증코드가 일치하지 않습니다.";
    }
    throw error;
  }
};
