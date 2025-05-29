import { saveDraft } from "@/views/foreign/api/saveDraft";
import { sendActivity } from "../api/sendActivity";
import { toast } from "sonner";

export const handleSubmitActivity = async (
  submitType: "submit" | "draft",
  formData: FormData
) => {
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
