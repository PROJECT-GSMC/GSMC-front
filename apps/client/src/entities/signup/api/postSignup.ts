import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

import type { SignupFormProps } from "@shared/model/AuthForm";

export const postSignup = async (
  form: SignupFormProps,
): Promise<AxiosResponse> => {
  try {
    const response = await instance.post(`/auth/signup`, form);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "회원가입 실패";
    }
    throw error;
  }
};
