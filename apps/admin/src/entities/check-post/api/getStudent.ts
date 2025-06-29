import instance from "@repo/api/axios";
import type { Member } from "@repo/types/member";
import { type AxiosResponse } from "axios";

export const getStudent = async (
  email: string,
): Promise<AxiosResponse<Member>> => {
  const id = email.split("@")[0]?.slice(1);
  try {
    return await instance.get(`members/students/${id}`);
  } catch {
    throw new Error("학생 정보를 불러오는 데 실패했습니다.");
  }
};
