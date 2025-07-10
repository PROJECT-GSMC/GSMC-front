import type { SigninFormProps } from "@/shared/model/signin";
import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

interface SigninResponse {
  accessToken: string;
  refreshToken: string;
}

export const postSignin = async (
  form: SigninFormProps
): Promise<SigninResponse> => {
  try {
    const response: AxiosResponse<SigninResponse> = await instance.post(
      `/auth/signin`,
      form
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      const message =
        typeof error.response.data === "object" &&
        error.response.data !== null &&
        "message" in error.response.data
          ? (error.response.data as { message?: string }).message
          : undefined;

      throw new Error(message ?? "로그인 실패");
    }
    throw new Error("알 수 없는 로그인 에러 발생");
  }
};
