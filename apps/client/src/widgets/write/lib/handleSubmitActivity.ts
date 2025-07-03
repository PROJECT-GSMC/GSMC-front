import { postActivity } from "../api/postActivity";
import { postActivityDraft } from "../api/postActivityDraft";

export const handleSubmitActivity = async (
  submitType: "submit" | "draft",
  formData: FormData
) => {
  return await (submitType === "draft"
    ? postActivityDraft(formData)
    : postActivity(formData));
};
