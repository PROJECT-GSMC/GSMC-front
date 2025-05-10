import instance from "node_modules/@repo/ui/src/axios";

export const getPosts = async () => {
  return await instance.get(`/evidence/current`);
};
