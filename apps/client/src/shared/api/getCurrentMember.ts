import instance from "@repo/api/axios";
import { Member } from "@repo/types/member";

export const getCurrentMember = (): Promise<Member> => {
  return instance.get("members/students/current");
};
