import instance from "@repo/api/axios";
import { isAxiosError } from "axios";

import type {
  SigninFormProps,
  SigninFormResponse,
} from "@shared/model/AuthForm";

export const postSignin = async (form: SigninFormProps) => {
  try {
    const response = await instance.post(`/auth/signin`, form);
    return response.data as SigninFormResponse;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "로그인 실패";
    }
    throw error;
  }
};
