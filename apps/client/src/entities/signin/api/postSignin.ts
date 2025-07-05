import instance from "@repo/api/axios";
import { isAxiosError } from "axios";

import type {
  SigninFormProps,
  SigninFormResponse,
} from "@/shared/model/signin";

export const postSignin = async (
  form: SigninFormProps
): Promise<SigninFormResponse> => {
  try {
    const response = await instance.post<SigninFormResponse>(
      `/auth/signin`,
      form
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "로그인 실패";
    }
    throw error;
  }
};
