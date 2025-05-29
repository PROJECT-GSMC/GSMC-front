import instance from "@repo/api/axios";

export const saveDraft = async (activity: FormData) => {
  return await instance.post("/evidence/current/draft/activity", activity);
};
