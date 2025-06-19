import type { AxiosError } from "axios";

export const deletePost = async (id: number): Promise<AxiosError | boolean> => {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    return response.ok;
  } catch (error) {
    return error as AxiosError;
  }
};
