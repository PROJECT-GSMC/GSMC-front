import instance from "@repo/api/axios";
import type { Member } from "@repo/types/member";

export const getCurrentMember = async () => {
  const response = await instance.get<Member>("members/students/current");
  return response.data;
};
