import instance from "@repo/api/axios";

export const getMember = async (email: string) => {
  return instance.get(`/students/${email}`);
};
