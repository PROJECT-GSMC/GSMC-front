import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

import type {
  SigninFormProps,
  SigninFormResponse,
} from "@/shared/model/signin";

export const postSignin = async (
  form: SigninFormProps
): Promise<AxiosResponse<SigninFormResponse>> => {
  try {
    const response = await instance.post(`/auth/signin`, form);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "로그인 실패";
    }
    throw error;
  }
};
