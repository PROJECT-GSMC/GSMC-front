import instance from "@repo/api/axios";
import type { Member } from "@repo/types/member";
import { isAxiosError } from "axios";

import { extractStudentCode } from "@/shared/util/extractStudentId";

export const getMember = async (email: string) => {
  const studentCode = extractStudentCode(email);
  try {
    const respone = await instance.get<Member>(
      `/members/students/${studentCode}`
    );
    return respone;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "학생 정보를 불러오지 못했습니다.";
    }
    throw error;
  }
};
