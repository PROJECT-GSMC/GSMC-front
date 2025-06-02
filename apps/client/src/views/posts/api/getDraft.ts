import instance from "@repo/api/axios";

export const getDraft = async () => {
  return (await instance.get("/evidence/current/draft")).data;
};
