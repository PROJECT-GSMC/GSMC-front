import instance from "node_modules/@repo/ui/src/axios";

export const getDraft = async () => {
  return await instance.get("/current/draft");
};
