import instance from "../../../../../../packages/ui/src/axios";
import { postState } from "../../../../../../packages/ui/src/types/evidences";

export const getPosts = async (email: string, status: postState) => {
  const response = await instance.get(`/evidence/${email}?status=${status}`);
  return response.data;
};
