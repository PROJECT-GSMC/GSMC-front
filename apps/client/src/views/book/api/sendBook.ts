import instance from "node_modules/@repo/ui/src/axios";
import { Book } from "../model/book";

export const sendBook = async (bookData: Book) => {
  await instance.post("evidence/current/reading", bookData);
};
