import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

interface PostScore {
  categoryName: string;
  file: File;
  value: number;
}

export const PostScore = async (data: PostScore): Promise<AxiosResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("categoryName", data.categoryName);
    formData.append("value", data.value.toString());
    return await instance.post("/evidence/current/scoring", formData);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "자격증 등록 실패";
    }
    throw error;
  }
};
