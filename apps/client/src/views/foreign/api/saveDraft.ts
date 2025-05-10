import instance from "node_modules/@repo/ui/src/axios";

export const saveDraft = async (activity: FormData) => {
  return await instance.post("/evidence/current/draft/activity", activity);
};
