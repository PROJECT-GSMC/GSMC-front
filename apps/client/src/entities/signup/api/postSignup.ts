import instance from "../../../../../../packages/ui/src/axios";
import axios from "axios";
import { SignupFormProps } from "@shared/model/AuthForm";

export const postSignup = async (form: SignupFormProps) => {
  try {
    const response = await instance.post(`/auth/signup`, form);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data || "회원가입 실패";
    }
    throw error;
  }
};
