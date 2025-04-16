import axios from "axios";

export const patchVerifyEmail = async (code: number) => {
  try {
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, { code });
    return response;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "인증코드가 일치하지 않습니다.");
    }
    throw error;
  }
};
