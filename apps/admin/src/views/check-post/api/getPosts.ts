import instance from "@repo/api/axios";
import { postState } from "@repo/types/evidences";

export const getPosts = async (email: string, status: postState) => {
  const response = await instance.get(`/evidence/${email}?status=${status}`);
  return response.data;
};
