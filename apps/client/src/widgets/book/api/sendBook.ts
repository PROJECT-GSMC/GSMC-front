import instance from "../../../../../../packages/ui/src/axios";
import { Book } from "../model/book";

export const sendBook = async (bookData: Book) => {
  instance("/current/reading", {
    data: {
      bookData,
    },
  });
};
