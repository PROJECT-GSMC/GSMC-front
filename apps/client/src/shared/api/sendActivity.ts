import instance from "node_modules/@repo/ui/src/axios";

export const sendActivity = async (activity: FormData) => {
  await instance.post("evidence/current/activity", activity);
};
