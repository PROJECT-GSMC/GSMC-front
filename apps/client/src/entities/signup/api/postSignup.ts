import instance from "@repo/api/axios";
import { isAxiosError } from "axios";

import type { SignupFormProps } from "@shared/model/AuthForm";

export const postSignup = async (form: SignupFormProps) => {
  try {
    const response = await instance.post<{ success: boolean }>(
      `/auth/signup`,
      form
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "회원가입 실패";
    }
    throw error;
  }
};
