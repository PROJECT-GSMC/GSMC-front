import instance from "../../../../../packages/ui/src/axios";
import { Activity } from "../types/activity";

export const sendActivity = async (activity: Activity) => {
  instance.get("evidence/current/activity", {
    headers: {
      "Content-Type": "mulitpart/form-data",
    },
    data: {
      activity,
    },
  });
};
