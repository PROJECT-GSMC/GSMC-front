import instance from "@repo/api/axios";
import type { Member } from "@repo/types/member";
import type { AxiosResponse, AxiosInstance } from "axios";

export const getMember = async (
  email: string
): Promise<AxiosResponse<Member>> => {
  const emailParts = email.split("@");
  const firstPart = emailParts[0];

  if (typeof firstPart !== "string" || firstPart.length === 0) {
    throw new Error("Invalid email format");
  }

  const studentId = firstPart.slice(1);
  if (studentId.length === 0) {
    throw new Error("Invalid email format");
  }

  const axiosInstance = instance as AxiosInstance;
  return await axiosInstance.get<Member>(`/members/students/${studentId}`);
};
