import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

export const postSendEmail = async (
  email: string,
): Promise<AxiosResponse<{ success: boolean }>> => {
  try {
    const response = await instance.post(`/auth/send-email`, { email });
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      const errorMsg =
        (error.response.data as { error?: string }).error ??
        "인증 이메일 전송 실패";
      throw new Error(errorMsg);
    }

    throw new Error("알 수 없는 오류 발생");
  }
};
