import instance from "@repo/api/axios";
import type { PostResponse, PostStatus } from "@repo/types/evidences";

export const getPosts = async (email: string, status: PostStatus | null) => {
  return await instance.get<PostResponse>(
    `/evidence/${decodeURIComponent(email).split("@")[0]?.slice(1)}?status=${status}`
  );
};
