import axios from "axios";
import { SignupForm } from "../../../shared/model/AuthForm";

export const postSignup = async (form: SignupForm) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, form);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "회원가입 실패");
    }
    throw error;
  }
};
