import instance from "../../../../../../packages/ui/src/axios";
import { Book } from "../model/book";

export const sendBook = async (bookData: Book) => {
  await instance.post("evidence/current/reading", {
    data: {
      bookData,
    },
  });
};
