import { toast } from "sonner";

import { postBook } from "../api/postBook";
import { postBookDraft } from "../api/postBookDraft";
import type { Book } from "../model/book";

export const handleSubmitBook = async (
  data: Book,
  submitType: "submit" | "draft"
) => {
  try {
    await (submitType === "draft" ? postBookDraft(data) : postBook(data));
    toast.success(submitType === "draft" ? "임시저장 완료" : "제출 완료");
    return true;
  } catch {
    toast.error(submitType === "draft" ? "임시저장 실패" : "제출 실패");
    return false;
  }
};
