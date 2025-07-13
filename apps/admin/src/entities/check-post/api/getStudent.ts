import instance from "@repo/api/axios";
import type { Member } from "@repo/types/member";
import { type AxiosResponse } from "axios";

import { extractStudentCode } from "@/shared/util/extractStudentId";

export const getStudent = async (
  email: string
): Promise<AxiosResponse<Member>> => {
  const studentCode = extractStudentCode(email);
  try {
    return await instance.get(`members/students/${studentCode}`);
  } catch {
    throw new Error("학생 정보를 불러오는 데 실패했습니다.");
  }
};
