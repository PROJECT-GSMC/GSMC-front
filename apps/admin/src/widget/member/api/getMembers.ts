import instance from "../../../../../../packages/ui/src/axios";

export const getMembers = async () => {
  return instance.get(`/members/students`);
};
