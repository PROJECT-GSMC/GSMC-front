import instance from "@repo/api/axios";
import type { AxiosResponse } from "axios";
import type { Member } from "@repo/types/member";

interface MemberResponse {
  data: Member;
}

export const getMember = async (
  email: string
): Promise<AxiosResponse<MemberResponse>> => {
  const studentId = email.split("@")[0]?.substring(1);
  if (!studentId) {
    throw new Error("Invalid email format");
  }
  return instance.get<MemberResponse>(`/members/students/${studentId}`);
};
