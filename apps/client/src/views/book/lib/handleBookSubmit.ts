import { toast } from "sonner";
import { Book } from "../model/book";
import { sendBook } from "../api/sendBook";
import { saveBookDraft } from "../api/saveBookDraft";

export const handleSubmitBook = async (
  data: Book,
  submitType: "submit" | "draft"
) => {
  try {
    if (submitType === "draft") {
      await saveBookDraft(data);
    } else {
      await sendBook(data);
    }
    toast.success(submitType === "draft" ? "임시저장 완료" : "제출 완료");
    return true;
  } catch (e) {
    console.error(e);
    toast.error(submitType === "draft" ? "임시저장 실패" : "제출 실패");
    return false;
  }
};
