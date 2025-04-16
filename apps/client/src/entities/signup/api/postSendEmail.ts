import axios from "axios";

export const postSendEmail = async (email: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email`, { email });
    return response;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "인증 이메일 전송 실패");
    }
    throw error;
  }
};
