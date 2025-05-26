import { saveDraft } from "@/views/foreign/api/saveDraft";
import { Activity } from "../types/activity";
import { sendActivity } from "../api/sendActivity";
import { toast } from "sonner";

export const handleSubmitActivity = async (
  data: Activity,
  submitType: "submit" | "draft"
) => {
  const formData = new FormData();
  formData.append("file", data.file === undefined ? "" : data.file);
  formData.append(
    "categoryName",
    data.categoryName === undefined ? "" : data.categoryName
  );
  formData.append("title", data.title === undefined ? "" : data.title);
  formData.append("content", data.content === undefined ? "" : data.content);
  formData.append(
    "activityType",
    data.activityType === undefined ? "" : data.activityType
  );

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
