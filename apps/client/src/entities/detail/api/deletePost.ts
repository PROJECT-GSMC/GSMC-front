import instance from "@repo/api";
import { isAxiosError, type AxiosResponse } from "axios";

export const deletePost = async (id: number): Promise<AxiosResponse> => {
  try {
    const response = await instance.delete(`/evidence/current/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "게시물 삭제 실패";
    }
    throw error;
  }
};
