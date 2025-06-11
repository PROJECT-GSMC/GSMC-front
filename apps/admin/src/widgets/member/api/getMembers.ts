import instance from "@repo/api/axios";
import type { Member } from "@repo/types/member";
import type { AxiosResponse } from "axios";

interface MembersResponse {
  data: Member[];
}

export const getMembers = async (): Promise<AxiosResponse<MembersResponse>> => {
  return await instance.get<MembersResponse>("/members/students");
};
