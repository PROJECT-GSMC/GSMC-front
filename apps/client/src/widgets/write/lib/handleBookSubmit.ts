import { postBook } from "../api/postBook";
import { postBookDraft } from "../api/postBookDraft";
import type { Book } from "../model/book";

export const handleSubmitBook = async (
  data: Book,
  submitType: "submit" | "draft"
) => {
  return await (submitType === "draft" ? postBookDraft(data) : postBook(data));
};
