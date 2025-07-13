import instance from "@repo/api/axios";
import type { Member } from "@repo/types/member";
import { isAxiosError, type AxiosResponse } from "axios";

export const getMembers = async (): Promise<AxiosResponse<Member[]>> => {
  try {
    const respone = await instance.get<Member[]>("/members/students");
    return respone;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "학생 목록을 불러오지 못했습니다.";
    }
    throw error;
  }
};
