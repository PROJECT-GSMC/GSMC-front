import { toast } from "sonner";
import { Book } from "../../../views/book/model/book";
import { sendBook } from "../../../views/book/api/sendBook";
import { saveBookDraft } from "../../../views/book/api/saveBookDraft";

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
