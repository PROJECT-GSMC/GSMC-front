import { toast } from "sonner";

import { postActivity } from "../api/postActivity";
import { postActivityDraft } from "../api/postActivityDraft";

export const handleSubmitActivity = async (
  submitType: "submit" | "draft",
  formData: FormData
) => {
  try {
    await (submitType === "draft"
      ? postActivityDraft(formData)
      : postActivity(formData));
    toast.success(submitType === "draft" ? "임시저장 완료" : "제출 완료");
    return true;
  } catch {
    toast.error(submitType === "draft" ? "임시저장 실패" : "제출 실패");
    return false;
  }
};
