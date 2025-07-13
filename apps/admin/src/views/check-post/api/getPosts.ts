import instance from "@repo/api/axios";
import type { PostResponse, PostStatus } from "@repo/types/evidences";

import { extractStudentCode } from "@/shared/util/extractStudentId";

export const getPosts = async (email: string, status: PostStatus | null) => {
  const studentCode = extractStudentCode(email);

  return await instance.get<PostResponse>(
    `/evidence/${studentCode}?status=${status}`
  );
};
