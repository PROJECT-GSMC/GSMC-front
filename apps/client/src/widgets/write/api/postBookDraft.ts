import instance from "@repo/api/axios";

import type { Book } from "../model/book";

export const postBookDraft = async (data: Book) => {
  return await instance.post("/evidence/current/draft/reading", data);
};
