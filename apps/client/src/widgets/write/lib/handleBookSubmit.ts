import { toast } from "sonner";

import { saveBookDraft } from "../api/saveBookDraft";
import { sendBook } from "../api/sendBook";
import type { Book } from "../model/book";

export const handleSubmitBook = async (
  data: Book,
  submitType: "submit" | "draft"
) => {
  try {
    await (submitType === "draft" ? saveBookDraft(data) : sendBook(data));
    toast.success(submitType === "draft" ? "임시저장 완료" : "제출 완료");
    return true;
  } catch {
    toast.error(submitType === "draft" ? "임시저장 실패" : "제출 실패");
    return false;
  }
};
