import instance from "@repo/api/axios";

export const getMembers = async () => {
  return await instance.get(`/members/students`);
};
