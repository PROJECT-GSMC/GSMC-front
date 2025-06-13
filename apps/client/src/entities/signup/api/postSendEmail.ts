import instance from "@repo/api/axios";
import { isAxiosError } from "axios";

export const postSendEmail = async (email: string) => {
  try {
    const response = await instance.post(`/auth/send-email`, { email });
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "인증 이메일 전송 실패";
    }
    throw error;
  }
};
