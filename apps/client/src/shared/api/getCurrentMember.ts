import instance from "../../../../../packages/ui/src/axios";
import { Member } from "node_modules/@repo/ui/src/types/member";

export const getCurrentMember = (): Promise<Member> => {
  return instance.get("members/students/current");
};
