import { toast } from "sonner";
import { Book } from "../model/book";
import { sendBook } from "../api/sendBook";
import { saveBookDraft } from "../api/saveBookDraft";

export const handleSubmitBook = async (
  data: Book,
  submitType: "submit" | "draft"
) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("author", data.author);
  formData.append("page", data.page.toString());
  try {
    if (submitType === "draft") {
      await saveBookDraft(formData);
    } else {
      await sendBook(formData);
    }
    toast.success(submitType === "draft" ? "임시저장 완료" : "제출 완료");
  } catch (e) {
    console.error(e);
    toast.error(submitType === "draft" ? "임시저장 실패" : "제출 실패");
  }
};
