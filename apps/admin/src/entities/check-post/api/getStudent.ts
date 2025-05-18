import instance from "@repo/api/axios";

export const getStudent = async (email: string) => {
  return await instance.get(`/student/${email.split("@")[0]?.substring(1)}`);
};
