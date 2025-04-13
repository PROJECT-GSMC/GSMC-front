import axios from "axios";
import { AuthForm } from "../../../shared/model/AuthForm";

export const postSignin = async (form: AuthForm) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signin`, form);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "로그인 실패");
    }
    throw error;
  }
};
