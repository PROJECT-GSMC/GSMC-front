import instance from "@repo/api/axios";
import { isAxiosError } from "axios";

import type { SignupFormProps } from "@/shared/model/AuthForm";

interface SignupResponse {
  success: boolean;
  message: string;
}

export const postSignup = async (form: SignupFormProps): Promise<SignupResponse> => {
  try {
    const response = await instance.post<SignupResponse>(`/auth/signup`, form);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "회원가입 실패";
    }
    throw error;
  }
};
