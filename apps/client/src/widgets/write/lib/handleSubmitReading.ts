import { postReading } from "../api/postReading";
import { postReadingDraft } from "../api/postReadingDraft";
import type { Book } from "../model/book";

export const handleSubmitReading = async (
  data: Book,
  submitType: "submit" | "draft"
) => {
  return await (submitType === "draft"
    ? postReadingDraft(data)
    : postReading(data));
};
