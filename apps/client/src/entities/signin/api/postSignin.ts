import instance from "../../../../../../packages/ui/src/axios";
import axios from "axios";
import { SigninFormProps } from "@shared/model/AuthForm";

export const postSignin = async (form: SigninFormProps) => {
  try {
    const response = await instance.post(`/auth/signin`, form);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "로그인 실패");
    }
    throw error;
  }
};
