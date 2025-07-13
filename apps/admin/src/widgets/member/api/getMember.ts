import instance from "@repo/api/axios";
import type { Member } from "@repo/types/member";
import type { AxiosResponse } from "axios";

import { extractStudentCode } from "@/shared/util/extractStudentId";

export const getMember = async (
  email: string
): Promise<AxiosResponse<Member>> => {
  const studentCode = extractStudentCode(email);
  return await instance.get<Member>(`/members/students/${studentCode}`);
};
