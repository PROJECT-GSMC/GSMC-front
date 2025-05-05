import instance from "../../../../../../packages/ui/src/axios";

export const getMember = async (email: string) => {
  return instance.get(`/students/${email}`);
};
