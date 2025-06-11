import instance from "@repo/api/axios";
import { isAxiosError, type AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
}

export const patchVerifyEmail = async (code: number) => {
  try {
    const response = await instance.patch(`/auth/verify-email`, { code });
    return response;
  } catch (error_) {
    const error = error_ as AxiosError<ErrorResponse>;

    if (isAxiosError(error) && error.response) {
      const msg =
        error.response.data.message ?? "인증코드가 일치하지 않습니다.";
      throw new Error(msg);
    }

    throw new Error("이메일 인증 중 알 수 없는 에러가 발생했습니다.");
  }
};
