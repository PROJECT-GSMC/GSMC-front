import instance from "../../../../../../packages/ui/src/axios";
import axios from "axios";

export const postSendEmail = async (email: string) => {
  try {
    const response = await instance.post(`/auth/send-email`, { email });
    return response;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "인증 이메일 전송 실패");
    }
    throw error;
  }
};
