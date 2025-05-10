import instance from "node_modules/@repo/ui/src/axios";

export const sendBook = async (bookData: FormData) => {
  await instance.post("evidence/current/reading", {
    bookData,
  });
};
