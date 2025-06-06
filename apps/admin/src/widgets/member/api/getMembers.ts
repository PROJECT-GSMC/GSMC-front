import instance from "@repo/api/axios";
import type { AxiosResponse } from "axios";
import type { Member } from "@repo/types/member";

interface MembersResponse {
  data: Member[];
}

export const getMembers = async (): Promise<AxiosResponse<MembersResponse>> => {
  return instance.get<MembersResponse>("/members/students");
};
