import instance from "@repo/api/axios";

import type { Book } from "@/widgets/write/model/book";

export const patchReading = async (evidenceId: number, bookData: Book) => {
  await instance.patch(`evidence/reading/${evidenceId}`, bookData);
};
