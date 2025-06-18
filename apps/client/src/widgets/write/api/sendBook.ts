import instance from "@repo/api/axios";

import type { Book } from "../model/book";

export const sendBook = async (bookData: Book) => {
  await instance.post("evidence/current/reading", bookData);
};
