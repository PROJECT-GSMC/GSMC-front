import instance from "@repo/api/axios";
import type { Member } from "@repo/types/member";
import type { AxiosResponse, AxiosInstance } from "axios";

interface MembersResponse {
  data: Member[];
}

export const getMembers = async (): Promise<AxiosResponse<MembersResponse>> => {
  const axiosInstance = instance as AxiosInstance;
  return await axiosInstance.get<MembersResponse>("/members/students");
};
