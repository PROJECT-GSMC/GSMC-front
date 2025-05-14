import instance from "@repo/api/axios";

export const sendActivity = async (activity: FormData) => {
  await instance.post("evidence/current/activity", activity);
};
