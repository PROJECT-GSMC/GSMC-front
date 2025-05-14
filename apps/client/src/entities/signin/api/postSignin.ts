import instance from "@repo/api/axios";
import axios from "axios";
import { SigninFormProps } from "@shared/model/AuthForm";

export const postSignin = async (form: SigninFormProps) => {
  try {
    const response = await instance.post(`/auth/signin`, form);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data || "로그인 실패";
    }
    throw error;
  }
};
