import instance from "@repo/api/axios";

export const getMembers = async () => {
  return instance.get(`/members/students`);
};
