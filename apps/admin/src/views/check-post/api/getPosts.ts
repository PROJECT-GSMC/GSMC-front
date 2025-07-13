import instance from "@repo/api/axios";
import type { PostResponse, PostStatus } from "@repo/types/evidences";
import { isAxiosError } from "axios";

import { extractStudentCode } from "@/shared/util/extractStudentId";

export const getPosts = async (email: string, status: PostStatus) => {
  const studentCode = extractStudentCode(email);
  try {
    const response = await instance.get<PostResponse>(
      `/evidence/${studentCode}?status=${status}`
    );
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw (
        error.response.data ?? "학생 게시글 정보를 불러오는 데 실패했습니다."
      );
    }
    throw error;
  }
};
