import instance from "@repo/api";
import type { AxiosError, AxiosResponse } from "axios";

export const deletePost = async (
  id: number
): Promise<AxiosError | AxiosResponse> => {
  try {
    const response = await instance.delete(`/current/${id}`, {
      method: "DELETE",
    });

    return response;
  } catch (error) {
    return error as AxiosError;
  }
};
