import instance from "@repo/api/axios";
import { postState } from "@repo/types/evidences";

export const getPosts = async (email: string, status: postState | null) => {
  return await instance.get(
    `/evidence/${email.split("@")[0]?.substring(1)}?status=${status}`
  );
};
