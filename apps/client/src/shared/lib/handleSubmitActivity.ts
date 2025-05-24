import { saveDraft } from "@/views/foreign/api/saveDraft";
import { Activity } from "../types/activity";
import { sendActivity } from "../api/sendActivity";
import { toast } from "sonner";

export const handleSubmitActivity = async (
  data: Activity,
  submitType: "submit" | "draft"
) => {
  const formData = new FormData();
  if (data.file) {
    formData.append("file", data.file);
  }
  formData.append("categoryName", data.categoryName);
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("activityType", data.activityType);
  try {
    if (submitType === "draft") {
      await saveDraft(formData);
    } else {
      await sendActivity(formData);
    }
    toast.success(submitType === "draft" ? "임시저장 완료" : "제출 완료");
    return true;
  } catch (e) {
    console.error(e);
    toast.error(submitType === "draft" ? "임시저장 실패" : "제출 실패");
    return false;
  }
};
