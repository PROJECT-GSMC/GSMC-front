import instance from "@repo/api/axios";
import { Book } from "@/views/book/model/book";

export const updateReading = async (evidenceId: number, bookData: Book) => {
  await instance.patch(`evidence/current/reading/${evidenceId}`, bookData);
}; 