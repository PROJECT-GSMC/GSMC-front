import instance from "node_modules/@repo/ui/src/axios";
import { Book } from "../model/book";

export const saveBookDraft = async (data: Book) => {
  return await instance.post("/evidence/current/draft/reading", data);
};
