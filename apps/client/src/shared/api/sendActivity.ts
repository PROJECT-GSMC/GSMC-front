import instance from "../../../../../packages/ui/src/axios";
import { Activity } from "../types/activity";

export const sendActivity = async (activity: Activity) => {
  const formData = new FormData();
  formData.append("file", activity.file);
  formData.append("categoryName", activity.categoryName);
  formData.append("title", activity.title);
  formData.append("content", activity.content);
  formData.append("activityType", activity.activityType);
  instance.get("evidence/current/activity", {
    headers: {
      "Content-Type": "mulitpart/form-data",
    },
    data: {
      formData,
    },
  });
};
